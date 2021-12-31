import React from "react";

import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/datasetAndChartType";
import { isEmpty } from "lodash";

// Data visualization by chart type
import CanvasOfTable from "~/pages/chart/make-chart/canvas/CanvasOfTable";
import CanvasOfTableQuery from "~/pages/chart/make-chart/canvas/CanvasOfTableQuery";
import CanvasOfLineChart from "~/pages/chart/make-chart/canvas/CanvasOfLineChart";
import CanvasOfLineChartQuery from "~/pages/chart/make-chart/canvas/CanvasOfLineChartQuery";
import CanvasOfBarChart from "~/pages/chart/make-chart/canvas/CanvasOfBarChart";
import CanvasOfBarChartQuery from "~/pages/chart/make-chart/canvas/CanvasOfBarChartQuery";
import CanvasOfPieChart from "~/pages/chart/make-chart/canvas/CanvasOfPieChart";
import CanvasOfPieChartQuery from "~/pages/chart/make-chart/canvas/CanvasOfPieChartQuery";
import CanvasOfBubbleChart from "~/pages/chart/make-chart/canvas/CanvasOfBubbleChart";
import CanvasOfBubbleChartQuery from "~/pages/chart/make-chart/canvas/CanvasOfBubbleChartQuery";
import CanvasOfBigNumber from "~/pages/chart/make-chart/canvas/CanvasOfBigNumber";
import CanvasOfBigNumberQuery from "~/pages/chart/make-chart/canvas/CanvasOfBigNumberQuery";
import CanvasOfFilterBox from "~/pages/chart/make-chart/canvas/CanvasOfFilterBox";
import CanvasOfFilterBoxQuery from "~/pages/chart/make-chart/canvas/CanvasOfFilterBoxQuery";

class MakeChartRightPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {
        chartTitle: "- This is Title",
      },
      errors: {},
    };
    if (isEmpty(this.props.chartId)) {
      console.log("Right Panel");
      this.props.setChartTitle("- This is Title");
    } else {
      console.log("Right Panel - chartId: " + this.props.chartId + ", chartTitle: " + this.props.chartTitle);
      this.state.fields["chartTitle"] = this.props.chartTitle;
    }

    this.handleInputChange = this.handleInputChange.bind(this);
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
    this.props.setChartTitle(target.value);
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    let gnbNavbarHeight = this.props.gnbView === "show" ? 56 : 0; //document.getElementById("gnbNavbarComponent").clientHeight
    let paddingTopHeight = 10;

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

    // Right Area: Total Height
    let rightSubtractionHeight = gnbNavbarHeight + paddingTopHeight * 2;
    // console.log(rightSubtractionHeight);

    if (window.innerWidth < 500) {
      this.setState({ rightWdith: 450, rightHeight: 102 });
    } else {
      let update_right_height = window.innerHeight - rightSubtractionHeight;

      this.setState({
        rightHeight: update_right_height,
      });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  setQueryOfChart = (newQuery) => {
    this.queryOfChart = newQuery;
  };
  queryOfChart = () => {};

  makeChart = () => {
    this.queryOfChart();

    // branch by chart type
    // let chartType = this.props.chartType;

    // if (chartType === "table") {
    //   this.queryOfChart();
    // }
  };

  render() {
    const chartType = this.props.chartType;
    let canvasOfChart;
    let canvasOfChartQuery;
    if (chartType === "table") {
      canvasOfChart = <CanvasOfTable canvasMode="edit" index={0} />;
      canvasOfChartQuery = (
        <CanvasOfTableQuery
          canvasMode="edit"
          index={0}
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    } else if (chartType === "lineChart") {
      canvasOfChart = <CanvasOfLineChart canvasMode="edit" index={0} />;
      canvasOfChartQuery = (
        <CanvasOfLineChartQuery
          canvasMode="edit"
          index={0}
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    } else if (chartType === "barChart") {
      canvasOfChart = <CanvasOfBarChart canvasMode="edit" index={0} />;
      canvasOfChartQuery = (
        <CanvasOfBarChartQuery
          canvasMode="edit"
          index={0}
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    } else if (chartType === "pieChart") {
      canvasOfChart = <CanvasOfPieChart canvasMode="edit" index={0} />;
      canvasOfChartQuery = (
        <CanvasOfPieChartQuery
          canvasMode="edit"
          index={0}
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    } else if (chartType === "bubbleChart") {
      canvasOfChart = <CanvasOfBubbleChart canvasMode="edit" index={0} />;
      canvasOfChartQuery = (
        <CanvasOfBubbleChartQuery
          canvasMode="edit"
          index={0}
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    } else if (chartType === "bigNumber") {
      canvasOfChart = <CanvasOfBigNumber canvasMode="edit" index={0} />;
      canvasOfChartQuery = (
        <CanvasOfBigNumberQuery
          canvasMode="edit"
          index={0}
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    } else if (chartType === "filterBox") {
      canvasOfChart = <CanvasOfFilterBox canvasMode="edit" index={0} />;
      canvasOfChartQuery = (
        <CanvasOfFilterBoxQuery
          canvasMode="edit"
          index={0}
          setQueryOfChart={this.setQueryOfChart}
        />
      );
    }
    return (
      <div className="makeChartrighttPanel" id="makeChartrighttPanel">
        <div
          className="panel panel-default chart-container bg-light"
          style={{ height: this.state.rightHeight }}
        >
          <div className="panel-heading" id="right-panel-heading">
            <div className="container-fluid">
              <div className="slice-header">
                <div className="title-panel">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control bg-light"
                          id="chartTitle"
                          name="chartTitle"
                          value={this.state.fields["chartTitle"]}
                          onChange={this.handleInputChange}
                        />
                        <label for="chartTitle">Chart Title</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => this.makeChart()}
                      >
                        Refresh
                      </button>
                    </div>
                  </div>
                </div>
                <div className="right-button-panel"></div>
              </div>
            </div>
          </div>
          <div className="panel-body">
            {/* TODO: present by Chart Type */}
            {canvasOfChart}
            {canvasOfChartQuery}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // TODO: state of store => props by the corresponding component
  gnbView: state.actionOfGlobal.gnbView,
  chartId: state.datasetAndChartType.chartId,
  datasetId: state.datasetAndChartType.datasetId,
  chartType: state.datasetAndChartType.chartType,
  chartTitle: state.datasetAndChartType.chartTitle,
  timeColumn: state.makeChartPanelLeft.timeColumn,
  timeGrain: state.makeChartPanelLeft.timeGrain,
  timeRange: state.makeChartPanelLeft.timeRange,
  queryColumns: state.makeChartPanelLeft.queryColumns,
  queryOrdering: state.makeChartPanelLeft.queryOrdering,
  queryRowLimit: state.makeChartPanelLeft.queryRowLimit,
  queryFilters: state.makeChartPanelLeft.queryFilters,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setChartTitle: (data) => dispatch(action.setChartTitle(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MakeChartRightPanel);
