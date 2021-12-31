import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import AsyncSelect from "react-select/async";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isNotEmpty } from "~/utils/Valid";

class QuerySingleSeries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      singleSeriesOptions: [],
      defaultSingleSeries: [],
    };

    this.displayIcon = this.displayIcon.bind(this);
    this.hideIcon = this.hideIcon.bind(this);

    this.setQueryAreaByColumns = this.setQueryAreaByColumns.bind(this);
    // Query.Entity
    this.filterSingleSeiresOptions = this.filterSingleSeiresOptions.bind(this);
    this.promiseSingleSeriesOptions =
      this.promiseSingleSeriesOptions.bind(this);
    this.handleInputChangeSingleSeries =
      this.handleInputChangeSingleSeries.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    let datasetSpecs = this.props.datasetSpecs;
    this.setQueryAreaByColumns(datasetSpecs);

    if (
      isNotEmpty(this.props.chartId) &&
      isNotEmpty(this.props.querySingleSeries)
    ) {
      const savedQuerySingleSeries = this.props.querySingleSeries; // String type : ""
      let filteredList = [];
      filteredList.push({
        value: savedQuerySingleSeries,
        label: savedQuerySingleSeries,
      });
      this.setState({ defaultSingleSeries: filteredList });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      let datasetSpecs = this.props.datasetSpecs;
      this.setQueryAreaByColumns(datasetSpecs);

      if (
        isNotEmpty(this.props.chartId) &&
        isNotEmpty(this.props.querySingleSeries)
      ) {
        const savedQuerySingleSeries = this.props.querySingleSeries; // String type : ""
        let filteredList = [];
        filteredList.push({
          value: savedQuerySingleSeries,
          label: savedQuerySingleSeries,
        });
        this.setState({ defaultSingleSeries: filteredList });
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {}

  setQueryAreaByColumns(data) {
    let singleSeriesOptions = [];
    data.forEach((element) => {
      singleSeriesOptions.push({
        value: element["columnName"],
        label: element["columnName"].toLowerCase(),
      });
      this.setState({ singleSeriesOptions: singleSeriesOptions });
    });
  }

  /**
   * Query.Single Series
   * @param {*} inputValue
   * @returns
   */
  filterSingleSeiresOptions = (inputValue) => {
    return this.state.singleSeriesOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  promiseSingleSeriesOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterSingleSeiresOptions(inputValue));
      }, 2000);
    });
  handleInputChangeSingleSeries = (selectedOption) => {
    if (selectedOption["value"]) {
      this.props.setQuerySingleSeries(selectedOption["value"]);
      this.setState({ defaultSingleSeries: selectedOption });
    }
  };

  displayIcon() {
    this.setState({ isVisibleIcon: true });
  }
  hideIcon() {
    this.setState({ isVisibleIcon: false });
  }

  render() {
    const renderInfoQuerySeries = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        엔티티의 그룹화를 정의합니다. 각 시리즈는 차트에 특정 색상으로 표시되며
        범례 토글이 있습니다.
      </Tooltip>
    );

    return (
      <div className="col-6" style={{ paddingBottom: 10 }}>
        <div className="row" style={{ paddingLeft: 20 }}>
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onMouseOver={this.displayIcon}
            onMouseOut={this.hideIcon}
          >
            <div align="left" style={{ float: "left" }}>
              Series
            </div>
            <div align="left" style={{ float: "left" }}>
              &nbsp;
            </div>
            <div
              align="left"
              style={{
                float: "left",
                display: this.state.isVisibleIcon ? "block" : "none",
              }}
            >
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderInfoQuerySeries}
              >
                <i className="bi bi-info-circle"></i>
              </OverlayTrigger>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingLeft: 20 }}>
          <AsyncSelect
            value={this.state.defaultSingleSeries}
            cacheOptions
            defaultOptions
            loadOptions={this.promiseSingleSeriesOptions}
            onChange={this.handleInputChangeSingleSeries}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  chartId: state.datasetAndChartType.chartId,
  chartType: state.datasetAndChartType.chartType,
  datasetSpecs: state.datasetAndChartType.datasetSpecs,
  querySingleSeries: state.makeChartPanelLeft.querySingleSeries,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setQuerySingleSeries: (data) => dispatch(action.setQuerySingleSeries(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuerySingleSeries);
