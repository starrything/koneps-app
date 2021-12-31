import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import { isNotEmpty } from "~/utils/Valid";
import * as actionOfLineChart from "~/modules/chart/actionOfLineChart";
import * as actionOfDashboardChartView from "~/modules/dashboard/dashboardChartView";

const MySwal = withReactContent(Swal);

class CanvasOfLineChartQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCount: 0,
      timer: 0,
    };

    this.makeChartByLineChart = this.makeChartByLineChart.bind(this);
  }

  componentDidMount() {
    this.props.setQueryOfChart(this.makeChartByLineChart);
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.chartType !== this.props.chartType) {
    //   this.props.setQueryOfChart(this.makeChartByLineChart);
    // }
    if (this.state.filteredCount !== this.props.clickCount) {
      this.setState({ filteredCount: this.props.clickCount });
      this.makeChartByLineChart();
    }

    if (this.state.timer !== this.props.timer) {
      this.setState({ timer: this.props.timer });
      this.makeChartByLineChart();
    }
  }

  makeChartByLineChart() {
    let canvasMode = this.props.canvasMode;
    let filterBoxApply = this.props.filterBoxApply;
    let timer = this.props.timer;

    let datasetId;
    let timeColumn;
    let timeGrain;
    let timeRange;
    let queryMetrics;
    let queryGroupBy;
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
        queryMetrics = this.props.vQueryMetrics;
        queryGroupBy = this.props.vQueryGroupBy;
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
        queryMetrics = chartParams[0].queryMetrics;
        queryGroupBy = chartParams[0].queryGroupBy;
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
      queryMetrics = this.props.queryMetrics;
      queryGroupBy = this.props.queryGroupBy;
      queryRowLimit = this.props.queryRowLimit;
      queryFilters = this.props.queryFilters;
    }

    if (queryMetrics.length === 0) {
      MySwal.fire({
        icon: "error",
        text: "Metrics is not setting. - Line Chart",
      });
      return false;
    }
    if (timeColumn === "") {
      MySwal.fire({
        icon: "error",
        text: "Time Column is not setting. - Line Chart",
      });
      return false;
    }

    let self = this;
    AxiosConfig.post("/api/chart/get-line", {
      datasetId: datasetId,
      timeColumn: timeColumn,
      timeGrain: timeGrain,
      timeRange: timeRange,
      queryMetrics: queryMetrics,
      queryGroupBy: queryGroupBy,
      queryFilters: queryFilters,
      queryRowLimit: queryRowLimit,
    })
      .then(function (response) {
        // success
        //self.props.setLineChartData(response.data);
        let myMap = new Map();
        // let myMap = {};
        if (canvasMode === "view") {
          myMap.set(self.props.index, response.data);
          // myMap[self.props.index] = response.data;
        } else {
          myMap.set(0, response.data);
          // myMap[0] = response.data;
        }
        let thisLineChartData = [];
        thisLineChartData = [...self.props.lineChartData, myMap];
        self.props.setLineChartData(thisLineChartData);

        let history = {};
        history = {
          index: self.props.index,
          type: "lineChart",
          datasetId: datasetId,
          timeColumn: timeColumn,
          timeGrain: timeGrain,
          timeRange: timeRange,
          queryMetrics: queryMetrics,
          queryGroupBy: queryGroupBy,
          queryFilters: queryFilters,
          queryRowLimit: queryRowLimit,
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
  timeColumn: state.makeChartPanelLeft.timeColumn,
  timeGrain: state.makeChartPanelLeft.timeGrain,
  timeRange: state.makeChartPanelLeft.timeRange,
  queryMetrics: state.makeChartPanelLeft.queryMetrics,
  queryGroupBy: state.makeChartPanelLeft.queryGroupBy,
  queryFilters: state.makeChartPanelLeft.queryFilters,
  vDatasetId: state.dashboardChartView.datasetId,
  vChartType: state.dashboardChartView.chartType,
  vTimeColumn: state.dashboardChartView.timeColumn,
  vTimeGrain: state.dashboardChartView.timeGrain,
  vTimeRange: state.dashboardChartView.timeRange,
  vQueryMetrics: state.dashboardChartView.queryMetrics,
  vQueryGroupBy: state.dashboardChartView.queryGroupBy,
  vQueryFilters: state.dashboardChartView.queryFilters,
  filterBoxDataset: state.actionOfFilterBox.filterBoxDataset,
  filterBoxCondition: state.actionOfFilterBox.filterBoxCondition,
  filterBoxApply: state.actionOfFilterBox.filterBoxApply,
  clickCount: state.actionOfFilterBox.clickCount,
  chartHistory: state.dashboardChartView.chartHistory,
  timer: state.actionOfGlobal.timer,
  lineChartData: state.actionOfLineChart.lineChartData,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setLineChartData: (data) =>
    dispatch(actionOfLineChart.setLineChartData(data)),
  setChartHistory: (data) =>
    dispatch(actionOfDashboardChartView.setChartHistory(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasOfLineChartQuery);
