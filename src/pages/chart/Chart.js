import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AxiosConfig from "~/utils/AxiosConfig";
import { AgGridReact } from "ag-grid-react";
import ActionRenderer from "~/pages/chart/ChartActionRenderer";
import DeleteChartModal from "~/pages/chart/DeleteChartModal";
import { isNotEmpty } from "~/utils/Valid";
import { resetStore } from "~/modules/index";
import * as actionsOfDataset from "~/modules/chart/datasetAndChartType";
import * as actionsOfLeftPanel from "~/modules/chart/makeChartPanelLeft";

const gridOptions = {
  // PROPERTIES
  // Objects like myRowData and myColDefs would be created in your application
  pagination: true,
  rowSelection: "single",
  isScrollLag: () => false,
};

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      rowData: [],
      columnDefs: [],
      selectedRow: {},
    };

    this.state.columnDefs = [
      { headerName: "Chart Id", field: "chartId", hide: true },
      { headerName: "Dataset Id", field: "datasetId", hide: true },
      {
        headerName: "Chart Title",
        field: "chartTitle",
        width: "300",
        sortable: true,
      },
      { headerName: "Visualization Type", field: "chartType", sortable: true },
      { headerName: "Modified By", field: "modifiedBy", sortable: true },
      { headerName: "Last Modified", field: "modifiedDate", sortable: true },
      { headerName: "Created By", field: "createdBy", sortable: true },
      { headerName: "Action", field: "action", cellRenderer: "ActionRenderer" },
    ];

    this.moveToMakeChart = React.createRef();

    this.searchChartList = this.searchChartList.bind(this);
    this.onCellDoubleClicked = this.onCellDoubleClicked.bind(this);
  }

  onCellClicked(params) {
    this.setState({
      chartId: params.data.chartId,
      selectedRow: {
        chartId: params.data.chartId,
        chartTitle: params.data.chartTitle,
        datasetId: params.data.datasetId,
      },
    });
  }

  searchChartList() {
    let self = this;
    let keyword = "";

    if (this.state.fields["searchKeyword"]) {
      keyword = this.state.fields["searchKeyword"];
    }

    AxiosConfig.get("/api/chart/search", {
      params: {
        keyword: keyword,
      },
    })
      .then(function (response) {
        // success
        self.setState({ rowData: response.data });
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  componentDidMount() {
    this.searchChartList();
  }

  onCellDoubleClicked(params) {
    const chartId = params.data.chartId;
    if (isNotEmpty(chartId)) {
      //view mode

      let self = this;
      AxiosConfig.get("/api/chart/spec", {
        params: {
          chartId: chartId,
        },
      })
        .then(function (response) {
          // success
          const spec = response.data;

          console.log("Now set redux store!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          self.props.setDatasetId(spec.datasetId);
          self.props.setChartId(spec.chartId);
          self.props.setChartType(spec.chartType);
          self.props.setChartTitle(spec.chartTitle);

          self.props.setTimeColumn(spec.timeColumn);
          self.props.setTimeGrain(spec.timeGrain);
          self.props.setTimeRange(spec.timeRange);

          self.props.setQueryColumns(spec.queryColumns);
          self.props.setQueryOrdering(spec.queryOrdering);
          self.props.setQueryRowLimit(spec.queryRowLimit);
          self.props.setQueryFilters(spec.queryFilters);
          self.props.setQueryMetric(spec.queryMetric);
          self.props.setQueryMetrics(spec.queryMetrics);
          self.props.setQueryGroupBy(spec.queryGroupBy);
          self.props.setQuerySeries(spec.querySeries);
          self.props.setQuerySingleSeries(spec.querySingleSeries);
          self.props.setQueryEntity(spec.queryEntity);

          self.props.setQueryXaxis(spec.queryXaxis);
          self.props.setQueryYaxis(spec.queryYaxis);
          self.props.setQueryBubbleSize(spec.queryBubbleSize);
          self.props.setQueryMaxBubbleSize(spec.queryMaxBubbleSize);
          self.props.setOptionsNumberFormat(spec.optionsNumberFormat);
          self.props.setFiltersConfiguration(spec.filtersConfiguration);
          self.props.setFilterBoxNumber(spec.filtersConfiguration.length);

          // go makeChart.js
          const location = {
            pathname: "/chart/make",
            state: {
              chartId: chartId,
              datasetId: spec.datasetId,
              chartType: spec.chartType,
            },
          };
          // Move to Chart workspace page - use queryString
          // let makeChartPath = this.state.makeChartPath;
          // makeChartPath["search"] =
          //   "?datasetId=" + datasetId + "&chartType=" + chartType;

          self.setState({ makeChartPath: location }, () => {
            self.moveToMakeChart.current.click();
          });
        })
        .catch(function (error) {
          // error
        })
        .then(function () {
          // finally
        });
    }
  }

  render() {
    return (
      <div>
        {/* <!-- Screen menu --> */}
        <nav
          className="navbar navbar-expand-sm navbar-light bg-white shadow-sm"
          aria-label="Third navbar example"
        >
          <div className="container-fluid">
            <Link to="#" className="navbar-brand">
              Charts
            </Link>
            <div className="collapse navbar-collapse" id="navbarsExample03">
              <ul className="navbar-nav me-auto mb-2 mb-sm-0"></ul>
              <form className="d-flex">
                {/* <button className="btn btn-success" type="button">
                  + Chart
                </button> */}
                <Link to="/chart/add" className="btn btn-success">
                  + Chart
                </Link>
              </form>
            </div>
          </div>
        </nav>
        {/* <!-- Search --> */}
        <div className="container-fluid">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <div className="row align-items-start">
              <div className="input-group mb-3">
                <input
                  name="searchKeyword"
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search keyword"
                  aria-describedby="button-addon2"
                  onChange={this.handleInputChange}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={this.searchChartList}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Grid Area --> */}
        <div className="container-fluid">
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: 500 }}
          >
            <AgGridReact
              rowData={this.state.rowData}
              columnDefs={this.state.columnDefs}
              gridOptions={gridOptions}
              defaultColDef={{ resizable: true }}
              frameworkComponents={{ ActionRenderer }}
              onCellClicked={(params) => this.onCellClicked(params)}
              onCellDoubleClicked={(params) => this.onCellDoubleClicked(params)}
            />
          </div>
          <Link
            to={this.state.makeChartPath}
            className="hide"
            ref={this.moveToMakeChart}
          />
        </div>
        {/* <!-- Modal --> */}
        <DeleteChartModal
          chartId={this.state.chartId}
          searchChartList={this.searchChartList}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

//export default MakeChart;
const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setDatasetId: (data) => dispatch(actionsOfDataset.setDatasetId(data)),
  setChartId: (data) => dispatch(actionsOfDataset.setChartId(data)),
  setChartType: (data) => dispatch(actionsOfDataset.setChartType(data)),
  setChartTitle: (data) => dispatch(actionsOfDataset.setChartTitle(data)),
  setTimeColumn: (data) => dispatch(actionsOfLeftPanel.setTimeColumn(data)),
  setTimeGrain: (data) => dispatch(actionsOfLeftPanel.setTimeGrain(data)),
  setTimeRange: (data) => dispatch(actionsOfLeftPanel.setTimeRange(data)),
  setQueryColumns: (data) => dispatch(actionsOfLeftPanel.setQueryColumns(data)),
  setQueryOrdering: (data) =>
    dispatch(actionsOfLeftPanel.setQueryOrdering(data)),
  setQueryRowLimit: (data) =>
    dispatch(actionsOfLeftPanel.setQueryRowLimit(data)),
  setQueryFilters: (data) => dispatch(actionsOfLeftPanel.setQueryFilters(data)),
  setQueryMetric: (data) => dispatch(actionsOfLeftPanel.setQueryMetric(data)),
  setQueryMetrics: (data) => dispatch(actionsOfLeftPanel.setQueryMetrics(data)),
  setQueryGroupBy: (data) => dispatch(actionsOfLeftPanel.setQueryGroupBy(data)),
  setQuerySeries: (data) => dispatch(actionsOfLeftPanel.setQuerySeries(data)),
  setQuerySingleSeries: (data) =>
    dispatch(actionsOfLeftPanel.setQuerySingleSeries(data)),
  setQueryEntity: (data) => dispatch(actionsOfLeftPanel.setQueryEntity(data)),
  setQueryXaxis: (data) => dispatch(actionsOfLeftPanel.setQueryXaxis(data)),
  setQueryYaxis: (data) => dispatch(actionsOfLeftPanel.setQueryYaxis(data)),
  setQueryBubbleSize: (data) =>
    dispatch(actionsOfLeftPanel.setQueryBubbleSize(data)),
  setQueryMaxBubbleSize: (data) =>
    dispatch(actionsOfLeftPanel.setQueryMaxBubbleSize(data)),
  setOptionsNumberFormat: (data) =>
    dispatch(actionsOfLeftPanel.setOptionsNumberFormat(data)),
  setFiltersConfiguration: (data) =>
    dispatch(actionsOfLeftPanel.setFiltersConfiguration(data)),
    setFilterBoxNumber: (data) =>
    dispatch(actionsOfLeftPanel.setFilterBoxNumber(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
