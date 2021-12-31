import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as actionOfFilterBox from "~/modules/chart/actionOfFilterBox";

class CanvasOfFilterBoxQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.makeChartByFilterBox = this.makeChartByFilterBox.bind(this);
  }

  componentDidMount() {
    this.props.setQueryOfChart(this.makeChartByFilterBox);
  }

  makeChartByFilterBox() {
    let canvasMode = this.props.canvasMode;

    let datasetId;
    let timeColumn;
    let timeRange;
    let filtersConfiguration;
    if (canvasMode === "view") {
      // view mode
      datasetId = this.props.vDatasetId;
      timeColumn = this.props.vTimeColumn;
      timeRange = this.props.vTimeRange;
      filtersConfiguration = this.props.vFiltersConfiguration;
    } else {
      // edit mode
      datasetId = this.props.datasetId;
      timeColumn = this.props.timeColumn;
      timeRange = this.props.timeRange;
      filtersConfiguration = this.props.filtersConfiguration;
    }

    let self = this;
    AxiosConfig.post("/api/chart/get-filterbox", {
      datasetId: datasetId,
      timeColumn: timeColumn,
      timeRange: timeRange,
      filtersConfiguration: filtersConfiguration,
    })
      .then(function (response) {
        // success
        self.props.setFilterBoxData(response.data);
        self.props.setFilterBoxDataset(datasetId);
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
  filtersConfiguration: state.makeChartPanelLeft.filtersConfiguration,
  vDatasetId: state.dashboardChartView.datasetId,
  vTimeColumn: state.dashboardChartView.timeColumn,
  vTimeRange: state.dashboardChartView.timeRange,
  vFiltersConfiguration: state.dashboardChartView.filtersConfiguration,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setFilterBoxData: (data) => dispatch(actionOfFilterBox.setFilterBoxData(data)),
  setFilterBoxDataset: (data) => dispatch(actionOfFilterBox.setFilterBoxDataset(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasOfFilterBoxQuery);
