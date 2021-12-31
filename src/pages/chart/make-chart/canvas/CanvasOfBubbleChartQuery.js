import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import { isNotEmpty } from "~/utils/Valid";
import * as actionOfBubbleChart from "~/modules/chart/actionOfBubbleChart";
import * as actionOfDashboardChartView from "~/modules/dashboard/dashboardChartView";

const MySwal = withReactContent(Swal);

class CanvasOfBubbleChartQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCount: 0,
      timer: 0,
    };

    this.makeChartByBubbleChart = this.makeChartByBubbleChart.bind(this);
  }

  componentDidMount() {
    this.props.setQueryOfChart(this.makeChartByBubbleChart);
  }

  componentDidUpdate(prevProps) {
    if (this.state.filteredCount !== this.props.clickCount) {
      this.setState({ filteredCount: this.props.clickCount });
      this.makeChartByBubbleChart();
    }

    if (this.state.timer !== this.props.timer) {
      this.setState({ timer: this.props.timer });
      this.makeChartByBubbleChart();
    }
  }

  makeChartByBubbleChart() {
    let canvasMode = this.props.canvasMode;
    let filterBoxApply = this.props.filterBoxApply;
    let timer = this.props.timer;

    let datasetId;
    let timeColumn;
    let timeRange;
    let querySingleSeries;
    let queryEntity;
    let queryBubbleSize;
    let queryXaxis;
    let queryYaxis;
    let queryFilters;
    let queryMaxBubbleSize;
    if (canvasMode === "view") {
      // view mode
      if (!filterBoxApply && timer === 0) {
        // init load
        datasetId = this.props.vDatasetId;
        timeColumn = this.props.vTimeColumn;
        timeRange = this.props.vTimeRange;
        querySingleSeries = this.props.vQuerySingleSeries;
        queryEntity = this.props.vQueryEntity;
        queryBubbleSize = this.props.vQueryBubbleSize;
        queryXaxis = this.props.vQueryXaxis;
        queryYaxis = this.props.vQueryYaxis;
        queryFilters = this.props.vQueryFilters;
        queryMaxBubbleSize = this.props.vQueryMaxBubbleSize;
      } else if (filterBoxApply || isNotEmpty(timer)) {
        // 1. from Dashboard view mode - apply by filterBox
        // 2. refresh by timeInterval
        const chartParams = this.props.chartHistory.filter(
          (el) => String(el.index) === String(this.props.index)
        );
        datasetId = chartParams[0].datasetId;
        timeColumn = chartParams[0].timeColumn;
        timeRange = chartParams[0].timeRange;
        querySingleSeries = chartParams[0].querySingleSeries;
        queryEntity = chartParams[0].queryEntity;
        queryBubbleSize = chartParams[0].queryBubbleSize;
        queryXaxis = chartParams[0].queryXaxis;
        queryYaxis = chartParams[0].queryYaxis;
        queryFilters = [
          ...chartParams[0].queryFilters,
          ...this.props.filterBoxCondition,
        ];
        queryMaxBubbleSize = chartParams[0].queryMaxBubbleSize;

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
      querySingleSeries = this.props.querySingleSeries;
      queryEntity = this.props.queryEntity;
      queryBubbleSize = this.props.queryBubbleSize;
      queryXaxis = this.props.queryXaxis;
      queryYaxis = this.props.queryYaxis;
      queryFilters = this.props.queryFilters;
      queryMaxBubbleSize = this.props.queryMaxBubbleSize;
    }

    if (queryEntity === "") {
      //alert("Entity can not be empty. - Bubble Chart");
      MySwal.fire({
        icon: "warning",
        text: "Entity can not be empty. - Bubble Chart",
      });
      return false;
    }
    if (Object.keys(queryBubbleSize).length === "") {
      //alert("Bubble size can not be empty. - Bubble Chart");
      MySwal.fire({
        icon: "warning",
        text: "Bubble size can not be empty. - Bubble Chart",
      });
      return false;
    }
    if (Object.keys(queryXaxis).length === "") {
      //alert("X Axis can not be empty. - Bubble Chart");
      MySwal.fire({
        icon: "warning",
        text: "X Axis can not be empty. - Bubble Chart",
      });
      return false;
    }
    if (Object.keys(queryYaxis).length === "") {
      //alert("Y Axis can not be empty. - Bubble Chart");
      MySwal.fire({
        icon: "warning",
        text: "Y Axis can not be empty. - Bubble Chart",
      });
      return false;
    }

    let self = this;
    AxiosConfig.post("/api/chart/get-bubble", {
      datasetId: datasetId,
      timeColumn: timeColumn,
      timeRange: timeRange,
      querySingleSeries: querySingleSeries,
      queryEntity: queryEntity,
      queryBubbleSize: queryBubbleSize,
      queryXaxis: queryXaxis,
      queryYaxis: queryYaxis,
      queryFilters: queryFilters,
      queryMaxBubbleSize: queryMaxBubbleSize,
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
        let thisBubbleChartData = [];
        thisBubbleChartData = [...self.props.bubbleChartData, myMap];
        self.props.setBubbleChartData(thisBubbleChartData);


        let history = {};
        history = {
          index: self.props.index,
          type: "bubbleChart",
          datasetId: datasetId,
          timeColumn: timeColumn,
          timeRange: timeRange,
          querySingleSeries: querySingleSeries,
          queryEntity: queryEntity,
          queryBubbleSize: queryBubbleSize,
          queryXaxis: queryXaxis,
          queryYaxis: queryYaxis,
          queryFilters: queryFilters,
          queryMaxBubbleSize: queryMaxBubbleSize,
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
  querySingleSeries: state.makeChartPanelLeft.querySingleSeries,
  queryEntity: state.makeChartPanelLeft.queryEntity,
  queryBubbleSize: state.makeChartPanelLeft.queryBubbleSize,
  queryXaxis: state.makeChartPanelLeft.queryXaxis,
  queryYaxis: state.makeChartPanelLeft.queryYaxis,
  queryFilters: state.makeChartPanelLeft.queryFilters,
  queryMaxBubbleSize: state.makeChartPanelLeft.queryMaxBubbleSize,
  vDatasetId: state.dashboardChartView.datasetId,
  vTimeColumn: state.dashboardChartView.timeColumn,
  vTimeRange: state.dashboardChartView.timeRange,
  vQuerySingleSeries: state.dashboardChartView.querySingleSeries,
  vQueryEntity: state.dashboardChartView.queryEntity,
  vQueryBubbleSize: state.dashboardChartView.queryBubbleSize,
  vQueryXaxis: state.dashboardChartView.queryXaxis,
  vQueryYaxis: state.dashboardChartView.queryYaxis,
  vQueryFilters: state.dashboardChartView.queryFilters,
  vQueryMaxBubbleSize: state.dashboardChartView.queryMaxBubbleSize,
  filterBoxDataset: state.actionOfFilterBox.filterBoxDataset,
  filterBoxCondition: state.actionOfFilterBox.filterBoxCondition,
  filterBoxApply: state.actionOfFilterBox.filterBoxApply,
  clickCount: state.actionOfFilterBox.clickCount,
  chartHistory: state.dashboardChartView.chartHistory,
  timer: state.actionOfGlobal.timer,
  bubbleChartData: state.actionOfBubbleChart.bubbleChartData,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setBubbleChartData: (data) =>
    dispatch(actionOfBubbleChart.setBubbleChartData(data)),
  setChartHistory: (data) =>
    dispatch(actionOfDashboardChartView.setChartHistory(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasOfBubbleChartQuery);
