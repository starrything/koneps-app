import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { isNotEmpty } from "~/utils/Valid";

// Front libraries
import "./react-select-custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./react-bs-popover-style.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// for Redux
import { connect } from "react-redux";
import { resetStore, resetLeftControlPanel } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import * as actionOfDatasource from "~/modules/chart/datasetAndChartType";

// Tabs
import CustomizeArea from "./tabs/CustomizeArea";

// Modal
import ChartTypeModal from "~/pages/chart/ChartTypeModal";

// Component - Time area
import TimeColumn from "./time-area/TimeColumn";
import TimeGrain from "./time-area/TimeGrain";
import TimeRange from "./time-area/TimeRange";

// Component - Query area
import QueryOfTable from "./query-area/QueryOfTable";
import QueryOfLineChart from "./query-area/QueryOfLineChart";
import QueryOfBarChart from "./query-area/QueryOfBarChart";
import QueryOfPieChart from "./query-area/QueryOfPieChart";
import QueryOfBubbleChart from "./query-area/QueryOfBubbleChart";
import QueryOfBigNumber from "./query-area/QueryOfBigNumber";
import QueryOfFilterBox from "./query-area/QueryOfFilterBox";

// Refresh method
import CanvasOfTableQuery from "~/pages/chart/make-chart/canvas/CanvasOfTableQuery";
import CanvasOfLineChartQuery from "~/pages/chart/make-chart/canvas/CanvasOfLineChartQuery";
import CanvasOfBarChartQuery from "~/pages/chart/make-chart/canvas/CanvasOfBarChartQuery";
import CanvasOfPieChartQuery from "~/pages/chart/make-chart/canvas/CanvasOfPieChartQuery";
import CanvasOfBubbleChartQuery from "~/pages/chart/make-chart/canvas/CanvasOfBubbleChartQuery";
import CanvasOfBigNumberQuery from "~/pages/chart/make-chart/canvas/CanvasOfBigNumberQuery";
import CanvasOfFilterBoxQuery from "~/pages/chart/make-chart/canvas/CanvasOfFilterBoxQuery";

// Component - Options area
import OptionsNumberFormat from "./option-area/OptionsNumberFormat";

const MySwal = withReactContent(Swal);

class MakeChartLeftPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: { chartType: this.props.chartType },
      errors: {},
      chartId: this.props.chartId,
      dataset: {},
      datasetId: this.props.datasetId,
      chartType: this.props.chartType,
      currChartTypeValue: this.props.chartType,
      limitedRowOptions: [],
    };

    this.moveToChartList = React.createRef();

    this.saveNewChart = this.saveNewChart.bind(this);

    // [Dataset & Chart Type]
    this.getDatasetFindById = this.getDatasetFindById.bind(this);
    this.changeChartType = this.changeChartType.bind(this);
    this.getDatabaseInfo = this.getDatabaseInfo.bind(this);
  }

  saveNewChart() {
    alert("Do you want to save this Chart?");
    // TODO #1 - Bubble chart -> Options
    // TODO #2 - Filter box -> Filters Configurations

    let self = this;
    AxiosConfig.post("/api/chart", {
      chartId: this.props.chartId,
      chartTitle: this.props.chartTitle,
      datasetId: this.state.datasetId,
      chartType: this.state.chartType,
      timeColumn: this.props.timeColumn,
      timeGrain: this.props.timeGrain,
      timeRange: this.props.timeRange,
      queryColumns: this.props.queryColumns,
      queryOrdering: this.props.queryOrdering,
      queryRowLimit: this.props.queryRowLimit,
      queryFilters: this.props.queryFilters,
      queryMetric: this.props.queryMetric,
      queryMetrics: this.props.queryMetrics,
      queryGroupBy: this.props.queryGroupBy,
      querySeries: this.props.querySeries,
      querySingleSeries: this.props.querySingleSeries,
      queryEntity: this.props.queryEntity,
      queryXaxis: this.props.queryXaxis,
      queryYaxis: this.props.queryYaxis,
      queryBubbleSize: this.props.queryBubbleSize,
      queryMaxBubbleSize: this.props.queryMaxBubbleSize,
      optionsNumberFormat: this.props.optionsNumberFormat,
      filtersConfiguration: this.props.filtersConfiguration,
      numFilterBox: this.props.numFilterBox,
    })
      .then(function (response) {
        // success
        //alert("Saved successfuly.");
        MySwal.fire({
          icon: "success",
          text: "Saved successfuly.",
        });
        self.moveToChartList.current.click();
      })
      .catch(function (error) {
        // error
        //alert("Failed to save this Chart.");
        MySwal.fire({
          icon: "error",
          text: "Failed to save this Chart.",
        });
      })
      .then(function () {
        // finally
      });
  }

  handleInputChange(event) {
    let fields = this.state.fields;
    let errors = {};

    const target = event.target;
    const name = target.name;
    fields[name] = target.type === "checkbox" ? target.checked : target.value;

    errors[target.name] = "";

    this.setState({
      errors: errors,
      fields: fields,
    });
  }

  getDatasetFindById() {
    let self = this;
    let datasetId = this.state.datasetId;

    AxiosConfig.get("/api/data/dataset/" + datasetId)
      .then(function (response) {
        // success
        self.setState({ dataset: response.data });
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  changeChartType(chartTypeValue, currChartTypeValue) {
    let fields = this.state.fields;
    let prevChartType = fields["chartType"];
    fields["chartType"] = chartTypeValue;

    this.setState({
      fields: fields,
      currChartTypeValue: currChartTypeValue,
      chartType: chartTypeValue,
      prevChartType: prevChartType,
    });
    this.props.setChartType(chartTypeValue); // Redux - makeChartPanelLeft.js
    this.props.resetLeftControlPanel();
  }

  getDatabaseInfo() {
    let self = this;
    let datasetId = this.state.datasetId;

    AxiosConfig.get("/api/data/dataset/spec/" + datasetId)
      .then(function (response) {
        // success
        self.props.setDatasetSpecs(response.data);
      })
      .catch(function (error) {
        // error
        //alert("Dataset 가져오기 오류");
        MySwal.fire({
          icon: "error",
          text: "Dataset 가져오기 오류",
        });
        return false;
      })
      .then(function () {
        // finally
      });
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    const datasetId = this.props.datasetId;
    let canvasMode = this.props.canvasMode;
    console.log(canvasMode);
    console.log(datasetId);

    if (canvasMode !== "view" && isNotEmpty(datasetId)) {
      let gnbNavbarHeight = this.props.gnbView === "show" ? 56 : 0; //document.getElementById("gnbNavbarComponent").clientHeight
      let paddingTopHeight = 10;
      let leftBtnGroup = this.props.gnbView === "show" ? 31 : 0;
      // let leftBtnGroup = document.getElementById(
      //   "makeChartLeftBtnGroup"
      // ).clientHeight;
      let leftTabGroup = this.props.gnbView === "show" ? 41 : 0;
      // let leftTabGroup = document.getElementById(
      //   "makeChartLeftTabGroup"
      // ).clientHeight;

      /**
       * Screen layout :
       * # 공통 레이아웃
       * 1. 글로벌 내비게이션 바 (Top Menu) - gnbNavbarComponent : 56
       * 2. MakeChart 컴포넌트 패딩 : 10
       * # 왼쪽 영역
       * 3. [ Refresh | Save ] 버튼 그룹 : 31
       * 4. MakeChart 컴포넌트 패딩 : 10
       * 5. [ Data | Customize ] 탭 그룹 : 42
       */
      // Left Area: Total Height
      let leftSubtractionHeight =
        gnbNavbarHeight +
        paddingTopHeight * 3 +
        leftBtnGroup +
        (leftTabGroup + 1);

      if (window.innerWidth < 500) {
        this.setState({ width: 450, height: 102 });
      } else {
        let update_width = window.innerWidth - 100;
        let update_left_height = window.innerHeight - leftSubtractionHeight;
        console.log(update_width);

        this.setState({
          leftWidth: update_width,
          leftHeight: update_left_height,
        });
      }
    }
  }

  refreshOfChart = () => {};

  setQueryOfChart = (newQuery) => {
    this.refreshOfChart = newQuery;
  };

  refreshChart = () => {
    // branch by chart type
    this.refreshOfChart();
  };

  /**
   * Add event listener
   */
  componentDidMount() {
    this.props.setCanvasMode("edit");

    this.getDatasetFindById();
    this.getDatabaseInfo();

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    if (this.state.chartId) {
      console.log("----- Edit mode (saved Chart) -----");
      this.refreshChart();
    } else {
      console.log("MakeChartLeftPanel - componentDidMount()");
      //this.props.resetStore();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.prevChartType !== this.state.chartType) {
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    console.log("MakeChartLeftPanel - componentWillUnmount()");
    this.props.resetStore();
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const chartType = this.state.fields["chartType"];
    let queryArea;
    let refreshCanvas;
    if (chartType === "table") {
      queryArea = <QueryOfTable />;
      refreshCanvas = (
        <CanvasOfTableQuery
          canvasMode="edit"
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    } else if (chartType === "lineChart") {
      queryArea = <QueryOfLineChart />;
      refreshCanvas = (
        <CanvasOfLineChartQuery
          canvasMode="edit"
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    } else if (chartType === "barChart") {
      queryArea = <QueryOfBarChart />;
      refreshCanvas = (
        <CanvasOfBarChartQuery
          canvasMode="edit"
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    } else if (chartType === "pieChart") {
      queryArea = <QueryOfPieChart />;
      refreshCanvas = (
        <CanvasOfPieChartQuery
          canvasMode="edit"
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    } else if (chartType === "bubbleChart") {
      queryArea = <QueryOfBubbleChart />;
      refreshCanvas = (
        <CanvasOfBubbleChartQuery
          canvasMode="edit"
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    } else if (chartType === "bigNumber") {
      queryArea = <QueryOfBigNumber />;
      refreshCanvas = (
        <CanvasOfBigNumberQuery
          canvasMode="edit"
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    } else if (chartType === "filterBox") {
      refreshCanvas = (
        <CanvasOfFilterBoxQuery
          canvasMode="edit"
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    }

    const renderTooltipTime = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        attribute(속성)에서 시간과 관련된 항목
      </Tooltip>
    );

    return (
      <div className="makeChartLeftPanel" id="makeChartLeftPanel">
        <div className="btn-group query-and-save" id="makeChartLeftBtnGroup">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            id="makeChartRefreshBtn"
            onClick={this.refreshChart}
          >
            <i className="bi bi-bootstrap-reboot"></i>
            Refresh
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            id="makeChartSaveBtn"
            onClick={this.saveNewChart}
          >
            <i className="bi bi-check-circle"></i>
            Save
          </button>
        </div>
        {/* Now... this is Tab area */}
        <div style={{ paddingTop: 10 }} id="makeChartLeftControlPanel">
          {/* Tab button Group */}
          <ul
            className="nav nav-tabs row"
            id="makeChartLeftTabGroup"
            role="tablist"
            style={{ margin: 0 }}
          >
            <li
              className="nav-item col-6"
              role="presentation"
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              <button
                className="nav-link active"
                id="makeChartDataTab"
                data-bs-toggle="tab"
                data-bs-target="#dataTab"
                type="button"
                role="tab"
                aria-controls="dataTab"
                aria-selected="true"
                style={{ width: "100%" }}
              >
                Data
              </button>
            </li>
            <li
              className="nav-item col-6"
              role="presentation"
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              <button
                className="nav-link"
                id="makeChartCustomTab"
                data-bs-toggle="tab"
                data-bs-target="#customizeTab"
                type="button"
                role="tab"
                aria-controls="customizeTab"
                aria-selected="false"
                style={{ width: "100%" }}
              >
                Customize
              </button>
            </li>
          </ul>
          {/* Tab Contents Area */}
          <div
            className="tab-content bg-light"
            id="myTabContent"
            style={{
              overflowX: "hidden",
              overflowY: "scroll",
              height: this.state.leftHeight,
            }}
          >
            {/* TODO: Componentalize */}
            <div
              className="tab-pane fade show active"
              id="dataTab"
              role="tabpanel"
              aria-labelledby="data-tab"
              style={{ padding: 5 }}
            >
              {/* Control Panel Section - Dataset & Chart Type */}
              <div className="control-panel-section" style={{ padding: 5 }}>
                <div
                  className="panel-heading"
                  style={{ padding: 5, borderBottom: "solid 1px" }}
                >
                  <div className="row">
                    <div className="col-6">
                      <h5>Dataset & Chart Type</h5>
                    </div>
                    <div className="col-6" style={{ textAlign: "right" }}>
                      <button
                        className="btn btn-sm btn-link"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseDataSection"
                        aria-expanded="false"
                        aria-controls="collapseDataSection"
                        style={{ color: "black" }}
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse show" id="collapseDataSection">
                <div className="row">
                  <div className="col" style={{ paddingBottom: 10 }}>
                    <div style={{ paddingLeft: 20 }}>Datasource</div>
                    <div style={{ paddingLeft: 20 }}>
                      <button
                        className="btn btn-secondary btn-sm disabled"
                        type="button"
                      >
                        {this.state.dataset["source"]}.
                        {this.state.dataset["datasetName"]}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col" style={{ paddingBottom: 10 }}>
                    <div style={{ paddingLeft: 20 }}>Visualization Type</div>
                    <div style={{ paddingLeft: 20 }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        type="button"
                        name="chartType"
                        value={this.state.fields["chartType"]}
                        data-bs-toggle="modal"
                        data-bs-target="#chartTypeModal"
                      >
                        {this.state.currChartTypeValue}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Control Panel Section - Time */}
              <div className="control-panel-section" style={{ padding: 5 }}>
                <div
                  className="panel-heading"
                  style={{ padding: 5, borderBottom: "solid 1px" }}
                >
                  <div className="row">
                    <div className="col-6">
                      <div style={{ position: "relative" }}>
                        <div align="left" style={{ float: "left" }}>
                          <h5>Time</h5>
                        </div>
                        <div align="left" style={{ float: "left" }}>
                          &nbsp;
                        </div>
                        <div align="left" style={{ float: "left" }}>
                          <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipTime}
                          >
                            <i className="bi bi-info-circle"></i>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </div>
                    <div className="col-6" style={{ textAlign: "right" }}>
                      <button
                        className="btn btn-sm btn-link"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTimeSection"
                        aria-expanded="false"
                        aria-controls="collapseTimeSection"
                        style={{ color: "black" }}
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse show" id="collapseTimeSection">
                <div className="row">
                  <TimeColumn />
                  <TimeGrain />
                </div>
                <TimeRange />
              </div>
              {/* TODO: We need refactoring this area by chart type */}
              {/* Control Panel Section - Query */}
              <div
                className="control-panel-section"
                style={{
                  padding: 5,
                  display:
                    this.state.fields["chartType"] === "filterBox"
                      ? "none"
                      : "block",
                }}
              >
                <div
                  className="panel-heading"
                  style={{ padding: 5, borderBottom: "solid 1px" }}
                >
                  <div className="row">
                    <div className="col-6">
                      <h5>Query</h5>
                    </div>
                    <div className="col-6" style={{ textAlign: "right" }}>
                      <button
                        className="btn btn-sm btn-link"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseQuerySection"
                        aria-expanded="false"
                        aria-controls="collapseQuerySection"
                        style={{ color: "black" }}
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse show" id="collapseQuerySection">
                {/* Query Area */}
                {queryArea}
              </div>
              {/* Control Panel Section - Options */}
              <div
                className="control-panel-section"
                style={{
                  padding: 5,
                  display:
                    this.state.fields["chartType"] === "bigNumber"
                      ? "block"
                      : "none",
                }}
              >
                <div
                  className="panel-heading"
                  style={{ padding: 5, borderBottom: "solid 1px" }}
                >
                  <div className="row">
                    <div className="col-6">
                      <h5>Options</h5>
                    </div>
                    <div className="col-6" style={{ textAlign: "right" }}>
                      <button
                        className="btn btn-sm btn-link"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOptionsSection"
                        aria-expanded="false"
                        aria-controls="collapseOptionsSection"
                        style={{ color: "black" }}
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse show" id="collapseOptionsSection">
                {/* Options Area */}
                <OptionsNumberFormat />
              </div>
              {/* Control Panel Section - Filters Configuration */}
              <div
                className="control-panel-section"
                style={{
                  padding: 5,
                  display:
                    this.state.fields["chartType"] === "filterBox"
                      ? "block"
                      : "none",
                }}
              >
                <div
                  className="panel-heading"
                  style={{ padding: 5, borderBottom: "solid 1px" }}
                >
                  <div className="row">
                    <div className="col-6">
                      <h5>Filters Configuration</h5>
                    </div>
                    <div className="col-6" style={{ textAlign: "right" }}>
                      <button
                        className="btn btn-sm btn-link"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFiltersSection"
                        aria-expanded="false"
                        aria-controls="collapseFiltersSection"
                        style={{ color: "black" }}
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse show" id="collapseFiltersSection">
                {/* Filters Area */}
                <QueryOfFilterBox />
              </div>
            </div>
            {/* 2nd Tab: 'Cuatomize' Tab */}
            <CustomizeArea />
          </div>
        </div>
        {/* <!-- Modal: Chart Type --> */}
        {/* TODO: Chart Type 코드관리 필요 */}
        <ChartTypeModal changeChartType={this.changeChartType} />
        {/* Refresh Functions: canvas painting */}
        {/* <CanvasOfTableQuery setQueryOfChart={this.setQueryOfChart} /> */}
        {refreshCanvas}
        <Link to="/chart/list" className="hide" ref={this.moveToChartList} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gnbView: state.actionOfGlobal.gnbView,
  canvasMode: state.datasetAndChartType.canvasMode,
  chartId: state.datasetAndChartType.chartId,
  chartTitle: state.datasetAndChartType.chartTitle,
  timeColumn: state.makeChartPanelLeft.timeColumn,
  timeGrain: state.makeChartPanelLeft.timeGrain,
  timeRange: state.makeChartPanelLeft.timeRange,
  queryColumns: state.makeChartPanelLeft.queryColumns,
  queryOrdering: state.makeChartPanelLeft.queryOrdering,
  queryRowLimit: state.makeChartPanelLeft.queryRowLimit,
  queryFilters: state.makeChartPanelLeft.queryFilters,
  queryMetric: state.makeChartPanelLeft.queryMetric,
  queryMetrics: state.makeChartPanelLeft.queryMetrics,
  queryGroupBy: state.makeChartPanelLeft.queryGroupBy,
  querySeries: state.makeChartPanelLeft.querySeries,
  querySingleSeries: state.makeChartPanelLeft.querySingleSeries,
  queryEntity: state.makeChartPanelLeft.queryEntity,
  queryXaxis: state.makeChartPanelLeft.queryXaxis,
  queryYaxis: state.makeChartPanelLeft.queryYaxis,
  queryBubbleSize: state.makeChartPanelLeft.queryBubbleSize,
  queryMaxBubbleSize: state.makeChartPanelLeft.queryMaxBubbleSize,
  optionsNumberFormat: state.makeChartPanelLeft.optionsNumberFormat,
  filtersConfiguration: state.makeChartPanelLeft.filtersConfiguration,
  numFilterBox: state.makeChartPanelLeft.numFilterBox,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  resetLeftControlPanel: () => dispatch(resetLeftControlPanel()),
  setCanvasMode: (data) => dispatch(actionOfDatasource.setCanvasMode(data)),
  setTimeColumn: (data) => dispatch(action.setTimeColumn(data)),
  setTimeGrain: (data) => dispatch(action.setTimeGrain(data)),
  setTimeRange: (data) => dispatch(action.setTimeRange(data)),
  setDatasetId: (data) => dispatch(actionOfDatasource.setDatasetId(data)),
  setChartType: (data) => dispatch(actionOfDatasource.setChartType(data)),
  setDatasetSpecs: (data) => dispatch(actionOfDatasource.setDatasetSpecs(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MakeChartLeftPanel);
