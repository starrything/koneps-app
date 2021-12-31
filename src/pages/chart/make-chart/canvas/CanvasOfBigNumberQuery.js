import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { format } from "d3-format";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as actionOfBigNumber from "~/modules/chart/actionOfBigNumber";
import * as actionOfDashboardChartView from "~/modules/dashboard/dashboardChartView";

const MySwal = withReactContent(Swal);

class CanvasOfBubbleChartQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCount: 0,
    };

    this.makeChartByBigNumber = this.makeChartByBigNumber.bind(this);
  }

  componentDidMount() {
    this.props.setQueryOfChart(this.makeChartByBigNumber);
  }

  componentDidUpdate(prevProps) {
    if (this.state.filteredCount !== this.props.clickCount) {
      this.setState({ filteredCount: this.props.clickCount });
      this.makeChartByBigNumber();
    }
  }

  makeChartByBigNumber() {
    let canvasMode = this.props.canvasMode;

    let datasetId;
    let timeColumn;
    let timeGrain;
    let timeRange;
    let queryMetric;
    let queryFilters;
    if (canvasMode === "view" && !this.props.filterBoxApply) {
      // view mode
      datasetId = this.props.vDatasetId;
      timeColumn = this.props.vTimeColumn;
      timeGrain = this.props.vTimeGrain;
      timeRange = this.props.vTimeRange;
      queryMetric = this.props.vQueryMetric;
      queryFilters = this.props.vQueryFilters;
    } else if (canvasMode === "view" && this.props.filterBoxApply) {
      // from Dashboard view mode - apply by filterBox
      console.log("filtered");
      const chartParams = this.props.chartHistory.filter(
        (el) => String(el.index) === String(this.props.index)
      );
      console.log(chartParams[0]);
      datasetId = chartParams[0].datasetId;
      timeColumn = chartParams[0].timeColumn;
      timeGrain = chartParams[0].timeGrain;
      timeRange = chartParams[0].timeRange;
      queryMetric = chartParams[0].queryMetric;
      queryFilters = [
        ...chartParams[0].queryFilters,
        ...this.props.filterBoxCondition,
      ];

      // check Dataset
      if (datasetId !== this.props.filterBoxDataset) {
        return false;
      }
    } else {
      // edit mode
      datasetId = this.props.datasetId;
      timeColumn = this.props.timeColumn;
      timeGrain = this.props.timeGrain;
      timeRange = this.props.timeRange;
      queryMetric = this.props.queryMetric;
      queryFilters = this.props.queryFilters;
    }

    if (Object.keys(queryMetric).length === 0) {
      //alert("Metric can not be empty. - Big Number");
      MySwal.fire({
        icon: "warning",
        text: "Metric can not be empty. - Big Number",
      });
      return false;
    }

    let self = this;
    AxiosConfig.post("/api/chart/get-bignumber", {
      chartId:this.props.chartId,
      datasetId: datasetId,
      timeColumn: timeColumn,
      timeGrain: timeGrain,
      timeRange: timeRange,
      queryMetric: queryMetric,
      queryFilters: queryFilters,
    })
      .then(function (response) {
        // success

        let bigNumber = "";
        let numberFormat = "";
        const bigNumberData = response.data.value;
        if (canvasMode === "view") {
          //numberFormat = self.props.vOptionsNumberFormat;
          numberFormat = response.data.numberFormat;
        } else {
          numberFormat = self.props.optionsNumberFormat;
        }
        if (numberFormat === "original") {
          //self.props.setBigNumber(bigNumber);
          bigNumber = bigNumberData;
        } else if (numberFormat === "decimal") {
          const f = format(",d");
          bigNumber = f(bigNumberData);
          //self.props.setBigNumber(bigNumber);
        } else if (numberFormat === "1string") {
          const f = format(".1s");
          bigNumber = f(bigNumberData);
          //self.props.setBigNumber(bigNumber);
        } else if (numberFormat === "3string") {
          const f = format(".3s");
          bigNumber = f(bigNumberData);
          //self.props.setBigNumber(bigNumber);
        } else if (numberFormat === "1percent") {
          const f = format(",.1%");
          bigNumber = f(bigNumberData);
          //self.props.setBigNumber(bigNumber);
        } else if (numberFormat === "3percent") {
          const f = format(".3%");
          bigNumber = f(bigNumberData);
          //self.props.setBigNumber(bigNumber);
        } else if (numberFormat === "4round") {
          const f = format(".4r");
          bigNumber = f(bigNumberData);
          //self.props.setBigNumber(bigNumber);
        } else if (numberFormat === "3float") {
          const f = format(",.3f");
          bigNumber = f(bigNumberData);
          //self.props.setBigNumber(bigNumber);
        } else if (numberFormat === "currency_won") {
          const f = format(",d");
          bigNumber = "₩" + f(bigNumberData);
          //self.props.setBigNumber(bigNumber);
        }

        let myMap = new Map();
        let bigNumberMap = new Map();
        // let myMap = {};
        if (canvasMode === "view") {
          myMap.set(self.props.index, response.data);
          bigNumberMap.set(self.props.index, bigNumber);
          // myMap[self.props.index] = response.data;
        } else {
          myMap.set(0, response.data);
          bigNumberMap.set(0, bigNumber);
          // myMap[0] = response.data;
        }
        let thisBigNumberData = [];
        thisBigNumberData = [...self.props.bigNumberData, myMap];
        self.props.setBigNumberData(thisBigNumberData);
        let thisBigNumber = [];
        thisBigNumber = [...self.props.bigNumber, bigNumberMap];
        self.props.setBigNumber(thisBigNumber);

        let history = {};
        history = {
          index: self.props.index,
          type: "bigNumber",
          datasetId: datasetId,
          timeColumn: timeColumn,
          timeGrain: timeGrain,
          timeRange: timeRange,
          queryMetric: queryMetric,
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
  timeColumn: state.makeChartPanelLeft.timeColumn,
  timeGrain: state.makeChartPanelLeft.timeGrain,
  timeRange: state.makeChartPanelLeft.timeRange,
  queryMetric: state.makeChartPanelLeft.queryMetric,
  queryFilters: state.makeChartPanelLeft.queryFilters,
  optionsNumberFormat: state.makeChartPanelLeft.optionsNumberFormat,
  vDatasetId: state.dashboardChartView.datasetId,
  vTimeColumn: state.dashboardChartView.timeColumn,
  vTimeGrain: state.dashboardChartView.timeGrain,
  vTimeRange: state.dashboardChartView.timeRange,
  vQueryMetric: state.dashboardChartView.queryMetric,
  vQueryFilters: state.dashboardChartView.queryFilters,
  vOptionsNumberFormat: state.dashboardChartView.optionsNumberFormat,
  filterBoxDataset: state.actionOfFilterBox.filterBoxDataset,
  filterBoxCondition: state.actionOfFilterBox.filterBoxCondition,
  filterBoxApply: state.actionOfFilterBox.filterBoxApply,
  clickCount: state.actionOfFilterBox.clickCount,
  chartHistory: state.dashboardChartView.chartHistory,
  bigNumberData: state.actionOfBigNumber.bigNumberData,
  bigNumber: state.actionOfBigNumber.bigNumber,
  numberFormat: state.actionOfBigNumber.numberFormat,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setBigNumberData: (data) =>
    dispatch(actionOfBigNumber.setBigNumberData(data)),
  setBigNumber: (data) => dispatch(actionOfBigNumber.setBigNumber(data)),
  setChartHistory: (data) =>
    dispatch(actionOfDashboardChartView.setChartHistory(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasOfBubbleChartQuery);
