import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import { isNotEmpty } from "~/utils/Valid";
import * as actionOfPieChart from "~/modules/chart/actionOfPieChart";
import * as actionOfDashboardChartView from "~/modules/dashboard/dashboardChartView";

const MySwal = withReactContent(Swal);

class CanvasOfPieChartQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCount: 0,
      timer: 0,
    };

    this.makeChartByPieChart = this.makeChartByPieChart.bind(this);
  }

  componentDidMount() {
    this.props.setQueryOfChart(this.makeChartByPieChart);
  }

  componentDidUpdate(prevProps) {
    if (this.state.filteredCount !== this.props.clickCount) {
      this.setState({ filteredCount: this.props.clickCount });
      this.makeChartByPieChart();
    }

    if (this.state.timer !== this.props.timer) {
      this.setState({ timer: this.props.timer });
      this.makeChartByPieChart();
    }
  }

  makeChartByPieChart() {
    let canvasMode = this.props.canvasMode;
    let filterBoxApply = this.props.filterBoxApply;
    let timer = this.props.timer;

    let datasetId;
    let timeColumn;
    let timeRange;
    let queryMetric;
    let queryGroupBy;
    let queryFilters;
    let queryRowLimit;
    if (canvasMode === "view") {
      // view mode
      if (!filterBoxApply && timer === 0) {
        // init load
        datasetId = this.props.vDatasetId;
        timeColumn = this.props.vTimeColumn;
        timeRange = this.props.vTimeRange;
        queryMetric = this.props.vQueryMetric;
        queryGroupBy = this.props.vQueryGroupBy;
        queryFilters = this.props.vQueryFilters;
        queryRowLimit = this.props.vQueryRowLimit;
      } else if (filterBoxApply || isNotEmpty(timer)) {
        // 1. from Dashboard view mode - apply by filterBox
        // 2. refresh by timeInterval
        const chartParams = this.props.chartHistory.filter(
          (el) => String(el.index) === String(this.props.index)
        );
        console.log(chartParams[0]);
        datasetId = chartParams[0].datasetId;
        timeColumn = chartParams[0].timeColumn;
        timeRange = chartParams[0].timeRange;
        queryMetric = chartParams[0].queryMetric;
        queryGroupBy = chartParams[0].queryGroupBy;
        queryFilters = [
          ...chartParams[0].queryFilters,
          ...this.props.filterBoxCondition,
        ];
        queryRowLimit = chartParams[0].queryRowLimit;

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
      queryMetric = this.props.queryMetric;
      queryGroupBy = this.props.queryGroupBy;
      queryFilters = this.props.queryFilters;
      queryRowLimit = this.props.queryRowLimit;
    }

    if (Object.keys(queryMetric).length === 0) {
      //alert("Metric is not setting. - Pie Chart");
      MySwal.fire({
        icon: "error",
        text: "Metric is not setting. - Pie Chart",
      });
      return false;
    }
    if (timeColumn === "") {
      //alert("Time Column is not setting. - Pie Chart");
      MySwal.fire({
        icon: "error",
        text: "Time Column is not setting. - Pie Chart",
      });
      return false;
    }

    let self = this;
    AxiosConfig.post("/api/chart/get-pie", {
      datasetId: datasetId,
      timeColumn: timeColumn,
      timeRange: timeRange,
      queryMetric: queryMetric,
      queryGroupBy: queryGroupBy,
      queryFilters: queryFilters,
      queryRowLimit: queryRowLimit,
    })
      .then(function (response) {
        // success
        let myMap = new Map();
        // let myMap = {};
        if (canvasMode === "view") {
          myMap.set(self.props.index, response.data);
          // myMap[self.props.index] = response.data;
        } else {
          myMap.set(0, response.data);
          // myMap[0] = response.data;
        }
        let thisPieChartData = [];
        thisPieChartData = [...self.props.pieChartData, myMap];
        self.props.setPieChartData(thisPieChartData);


        let history = {};
        history = {
          index: self.props.index,
          type: "pieChart",
          datasetId: datasetId,
          timeColumn: timeColumn,
          timeRange: timeRange,
          queryMetric: queryMetric,
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
  timeColumn: state.makeChartPanelLeft.timeColumn,
  timeRange: state.makeChartPanelLeft.timeRange,
  queryMetric: state.makeChartPanelLeft.queryMetric,
  queryGroupBy: state.makeChartPanelLeft.queryGroupBy,
  queryFilters: state.makeChartPanelLeft.queryFilters,
  queryRowLimit: state.makeChartPanelLeft.queryRowLimit,
  vDatasetId: state.dashboardChartView.datasetId,
  vTimeColumn: state.dashboardChartView.timeColumn,
  vTimeRange: state.dashboardChartView.timeRange,
  vQueryMetric: state.dashboardChartView.queryMetric,
  vQueryGroupBy: state.dashboardChartView.queryGroupBy,
  vQueryFilters: state.dashboardChartView.queryFilters,
  vQueryRowLimit: state.dashboardChartView.queryRowLimit,
  filterBoxDataset: state.actionOfFilterBox.filterBoxDataset,
  filterBoxCondition: state.actionOfFilterBox.filterBoxCondition,
  filterBoxApply: state.actionOfFilterBox.filterBoxApply,
  clickCount: state.actionOfFilterBox.clickCount,
  chartHistory: state.dashboardChartView.chartHistory,
  timer: state.actionOfGlobal.timer,
  pieChartData: state.actionOfPieChart.pieChartData,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setPieChartData: (data) => dispatch(actionOfPieChart.setPieChartData(data)),
  setChartHistory: (data) =>
    dispatch(actionOfDashboardChartView.setChartHistory(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasOfPieChartQuery);
