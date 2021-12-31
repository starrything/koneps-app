import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import { isNotEmpty } from "~/utils/Valid";
import * as actionOfBarChart from "~/modules/chart/actionOfBarChart";
import * as actionOfDashboardChartView from "~/modules/dashboard/dashboardChartView";

const MySwal = withReactContent(Swal);

class CanvasOfBarChartQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCount: 0,
      timer: 0,
    };

    this.makeChartByBarChart = this.makeChartByBarChart.bind(this);
  }

  componentDidMount() {
    this.props.setQueryOfChart(this.makeChartByBarChart);
  }

  componentDidUpdate(prevProps) {
    if (this.state.filteredCount !== this.props.clickCount) {
      this.setState({ filteredCount: this.props.clickCount });
      this.makeChartByBarChart();
    }

    if (this.state.timer !== this.props.timer) {
      this.setState({ timer: this.props.timer });
      this.makeChartByBarChart();
    }
  }

  makeChartByBarChart() {
    let canvasMode = this.props.canvasMode;
    let filterBoxApply = this.props.filterBoxApply;
    let timer = this.props.timer;

    // console.log("This is BarChart===============");
    // console.log("canvasMode: " + canvasMode + ", index: " + this.props.index);
    // console.log("datasetId: " + this.props.vDatasetId + ", filterBox: " + this.props.filterBoxDataset);
    // console.log("filterBox applyYn: " + this.props.filterBoxApply);

    let datasetId;
    let timeColumn;
    let timeRange;
    let queryMetrics;
    let querySeries;
    let queryRowLimit;
    let queryFilters;
    // console.log("(Bar) canvasMode: " + canvasMode);
    if (canvasMode === "view") {
      // view mode
      // console.log("filterBoxApply: " + filterBoxApply);
      // console.log("timer: " + timer);
      if (!filterBoxApply && timer === 0) {
        // init load
        datasetId = this.props.vDatasetId;
        timeColumn = this.props.vTimeColumn;
        timeRange = this.props.vTimeRange;
        queryMetrics = this.props.vQueryMetrics;
        querySeries = this.props.vQuerySeries;
        queryRowLimit = this.props.vQueryRowLimit;
        queryFilters = this.props.vQueryFilters;
      } else if (filterBoxApply || isNotEmpty(timer)) {
        // console.log("filterBox or timeInterval...");
        // 1. from Dashboard view mode - apply by filterBox
        // 2. refresh by timeInterval
        const chartParams = this.props.chartHistory.filter(
          (el) => String(el.index) === String(this.props.index)
        );
        console.log(chartParams[0]);
        datasetId = chartParams[0].datasetId;
        timeColumn = chartParams[0].timeColumn;
        timeRange = chartParams[0].timeRange;
        queryMetrics = chartParams[0].queryMetrics;
        querySeries = chartParams[0].querySeries;
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
      timeRange = this.props.timeRange;
      queryMetrics = this.props.queryMetrics;
      querySeries = this.props.querySeries;
      queryRowLimit = this.props.queryRowLimit;
      queryFilters = this.props.queryFilters;
    }

    if (querySeries.length === 0) {
      //alert("Series is not setting. - Bar Chart");
      MySwal.fire({
        icon: "error",
        text: "Series is not setting. - Bar Chart",
      });
      return false;
    }
    if (timeColumn === "") {
      //alert("Time Column is not setting. - Bar Chart");
      MySwal.fire({
        icon: "error",
        text: "Time Column is not setting. - Bar Chart",
      });
      return false;
    }

    let self = this;
    AxiosConfig.post("/api/chart/get-bar", {
      datasetId: datasetId,
      timeColumn: timeColumn,
      timeRange: timeRange,
      queryMetrics: queryMetrics,
      querySeries: querySeries,
      queryFilters: queryFilters,
      queryRowLimit: queryRowLimit,
    })
      .then(function (response) {
        // success
        //TODO: data settings
        let myMap = new Map();
        // let myMap = {};
        if (canvasMode === "view") {
          myMap.set(self.props.index, response.data);
          // myMap[self.props.index] = response.data;
        } else {
          myMap.set(0, response.data);
          // myMap[0] = response.data;
        }
        let thisBarChartData = [];
        thisBarChartData = [...self.props.barChartData, myMap];
        self.props.setBarChartData(thisBarChartData);

        let history = {};
        history = {
          index: self.props.index,
          type: "barChart",
          datasetId: datasetId,
          chartTitle: response.data.chartTitle,
          timeColumn: timeColumn,
          timeRange: timeRange,
          queryRowLimit: queryRowLimit,
          queryFilters: queryFilters,
          queryMetrics: queryMetrics,
          querySeries: querySeries,
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
  timeColumn: state.makeChartPanelLeft.timeColumn,
  timeRange: state.makeChartPanelLeft.timeRange,
  queryMetrics: state.makeChartPanelLeft.queryMetrics,
  querySeries: state.makeChartPanelLeft.querySeries,
  queryFilters: state.makeChartPanelLeft.queryFilters,
  queryRowLimit: state.makeChartPanelLeft.queryRowLimit,
  vDatasetId: state.dashboardChartView.datasetId,
  vTimeColumn: state.dashboardChartView.timeColumn,
  vTimeRange: state.dashboardChartView.timeRange,
  vQueryMetrics: state.dashboardChartView.queryMetrics,
  vQuerySeries: state.dashboardChartView.querySeries,
  vQueryFilters: state.dashboardChartView.queryFilters,
  vQueryRowLimit: state.dashboardChartView.queryRowLimit,
  filterBoxDataset: state.actionOfFilterBox.filterBoxDataset,
  filterBoxCondition: state.actionOfFilterBox.filterBoxCondition,
  filterBoxApply: state.actionOfFilterBox.filterBoxApply,
  clickCount: state.actionOfFilterBox.clickCount,
  chartHistory: state.dashboardChartView.chartHistory,
  timer: state.actionOfGlobal.timer,
  barChartData: state.actionOfBarChart.barChartData,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setBarChartData: (data) => dispatch(actionOfBarChart.setBarChartData(data)),
  setChartHistory: (data) =>
    dispatch(actionOfDashboardChartView.setChartHistory(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasOfBarChartQuery);
