import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import { isNotEmpty } from "~/utils/Valid";
import * as actionOfTable from "~/modules/chart/actionOfTable";
import * as actionOfDashboardChartView from "~/modules/dashboard/dashboardChartView";

class CanvasOfTableQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCount: 0,
      timer: 0,
    };

    this.makeChartByTable = this.makeChartByTable.bind(this);
  }

  componentDidMount() {
    this.props.setQueryOfChart(this.makeChartByTable);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chartType !== this.props.chartType) {
      this.props.setQueryOfChart(this.makeChartByTable);
    }

    if (this.state.filteredCount !== this.props.clickCount) {
      this.setState({ filteredCount: this.props.clickCount });
      this.makeChartByTable();
    }

    if (this.state.timer !== this.props.timer) {
      this.setState({ timer: this.props.timer });
      this.makeChartByTable();
    }
  }

  makeChartByTable() {
    let self = this;

    let canvasMode = this.props.canvasMode;
    let filterBoxApply = this.props.filterBoxApply;
    let timer = this.props.timer;

    let datasetId;
    let timeColumn;
    let timeGrain;
    let timeRange;
    let queryColumns;
    let queryOrdering;
    let queryRowLimit;
    let queryFilters;
    if (canvasMode === "view") {
      // view mode
      if (!filterBoxApply && timer === 0) {
        // init load
        datasetId = this.props.vDatasetId;
        timeColumn = this.props.vTimeColumn;
        timeGrain = this.props.vTimeGrain;
        timeRange = this.props.vTimeRange;
        queryColumns = this.props.vQueryColumns;
        queryOrdering = this.props.vQueryOrdering;
        queryRowLimit = this.props.vQueryRowLimit;
        queryFilters = this.props.vQueryFilters;
      } else if (filterBoxApply || isNotEmpty(timer)) {
        // 1. from Dashboard view mode - apply by filterBox
        // 2. refresh by timeInterval
        const chartParams = this.props.chartHistory.filter(
          (el) => String(el.index) === String(this.props.index)
        );
        console.log(chartParams[0]);
        datasetId = chartParams[0].datasetId;
        timeColumn = chartParams[0].timeColumn;
        timeGrain = chartParams[0].timeGrain;
        timeRange = chartParams[0].timeRange;
        queryColumns = chartParams[0].queryColumns;
        queryOrdering = chartParams[0].queryOrdering;
        queryRowLimit = chartParams[0].queryRowLimit;
        queryFilters = [
          ...chartParams[0].queryFilters,
          ...this.props.filterBoxCondition,
        ];

        // check Dataset
        if (datasetId !== this.props.filterBoxDataset) {
          return false;
        }
      }
    } else {
      // edit mode
      datasetId = this.props.datasetId;
      timeColumn = this.props.timeColumn;
      timeGrain = this.props.timeGrain;
      timeRange = this.props.timeRange;
      queryColumns = this.props.queryColumns;
      queryOrdering = this.props.queryOrdering;
      queryRowLimit = this.props.queryRowLimit;
      queryFilters = this.props.queryFilters;
    }

    AxiosConfig.post("/api/chart/get-table", {
      datasetId: datasetId,
      timeColumn: timeColumn,
      timeGrain: timeGrain,
      timeRange: timeRange,
      queryColumns: queryColumns,
      queryOrdering: queryOrdering,
      queryRowLimit: queryRowLimit,
      queryFilters: queryFilters,
    })
      .then(function (response) {
        // success
        self.props.setTableRowdata(response.data);

        // set agGrid column definitions
        let columnDefs = [];
        if (response.data.length > 0) {
          queryColumns.forEach((element) => {
            let row = {};
            row = {
              headerName: element["value"],
              field: element["value"],
              sortable: true,
              enableRowGroup: true,
              enableValue: true,
              enablePivot: true,
              pivot: true,
            };
            columnDefs.push(row);
          });

          self.props.setTableColdefs(columnDefs);
          self.props.tableGridApi.setColumnDefs(columnDefs);
        }

        let history = {};
        history = {
          index: self.props.index,
          type: "table",
          datasetId: datasetId,
          timeColumn: timeColumn,
          timeGrain: timeGrain,
          timeRange: timeRange,
          queryColumns: queryColumns,
          queryOrdering: queryOrdering,
          queryRowLimit: queryRowLimit,
          queryFilters: queryFilters,
        };
        self.props.setChartHistory([...self.props.chartHistory, history]);
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => ({
  // TODO: state of store => props by the corresponding component
  canvasMode: state.datasetAndChartType.canvasMode,
  datasetId: state.datasetAndChartType.datasetId,
  chartType: state.datasetAndChartType.chartType,
  chartTitle: state.makeChartPanelLeft.chartTitle,
  timeColumn: state.makeChartPanelLeft.timeColumn,
  timeGrain: state.makeChartPanelLeft.timeGrain,
  timeRange: state.makeChartPanelLeft.timeRange,
  queryColumns: state.makeChartPanelLeft.queryColumns,
  queryOrdering: state.makeChartPanelLeft.queryOrdering,
  queryRowLimit: state.makeChartPanelLeft.queryRowLimit,
  queryFilters: state.makeChartPanelLeft.queryFilters,
  vDatasetId: state.dashboardChartView.datasetId,
  vChartType: state.dashboardChartView.chartType,
  vChartTitle: state.dashboardChartView.chartTitle,
  vTimeColumn: state.dashboardChartView.timeColumn,
  vTimeGrain: state.dashboardChartView.timeGrain,
  vTimeRange: state.dashboardChartView.timeRange,
  vQueryColumns: state.dashboardChartView.queryColumns,
  vQueryOrdering: state.dashboardChartView.queryOrdering,
  vQueryRowLimit: state.dashboardChartView.queryRowLimit,
  vQueryFilters: state.dashboardChartView.queryFilters,
  tableGridApi: state.actionOfTable.tableGridApi,
  filterBoxDataset: state.actionOfFilterBox.filterBoxDataset,
  filterBoxCondition: state.actionOfFilterBox.filterBoxCondition,
  filterBoxApply: state.actionOfFilterBox.filterBoxApply,
  clickCount: state.actionOfFilterBox.clickCount,
  chartHistory: state.dashboardChartView.chartHistory,
  timer: state.actionOfGlobal.timer,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setTableRowdata: (data) => dispatch(actionOfTable.setTableRowdata(data)),
  setTableColdefs: (data) => dispatch(actionOfTable.setTableColdefs(data)),
  setChartHistory: (data) =>
    dispatch(actionOfDashboardChartView.setChartHistory(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasOfTableQuery);
