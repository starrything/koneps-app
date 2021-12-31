import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import AsyncSelect from "react-select/async";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isNotEmpty } from "~/utils/Valid";

class TimeColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      colSize: "",
      timeColumnOptions: [],
      defaultTimeColumn: [],
    };

    this.displayIcon = this.displayIcon.bind(this);
    this.hideIcon = this.hideIcon.bind(this);

    this.setTimeColumnOptions = this.setTimeColumnOptions.bind(this);
    // Time.TimeColumns
    this.filterTimeColumnOptions = this.filterTimeColumnOptions.bind(this);
    this.promiseTimeColumnOptions = this.promiseTimeColumnOptions.bind(this);
    this.handleInputChangeTimeColumn =
      this.handleInputChangeTimeColumn.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    let datasetSpecs = this.props.datasetSpecs;
    this.setTimeColumnOptions(datasetSpecs);

    let chartType = this.props.chartType;
    if (chartType === "table" || chartType === "lineChart") {
      this.setState({ colSize: "col-6" });
    } else if (
      chartType === "barChart" ||
      chartType === "pieChart" ||
      chartType === "bubbleChart" ||
      chartType === "bigNumber"
    ) {
      this.setState({ colSize: "col-12" });
    }

    const chartId = this.props.chartId;
    const timeColumn = this.props.timeColumn;
    if (isNotEmpty(chartId) && isNotEmpty(timeColumn)) {
      const savedTimeColumn = timeColumn;
      let filteredList = [];
      filteredList.push({
        value: savedTimeColumn,
        label: savedTimeColumn,
      });
      this.setState({ defaultTimeColumn: filteredList });
    } else {
      //this.setState({ defaultTimeColumn: this.state.timeColumnOptions });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      let datasetSpecs = this.props.datasetSpecs;
      this.setTimeColumnOptions(datasetSpecs);

      let chartType = this.props.chartType;
      if (chartType === "table" || chartType === "lineChart") {
        this.setState({ colSize: "col-6" });
      } else if (
        chartType === "barChart" ||
        chartType === "pieChart" ||
        chartType === "bubbleChart" ||
        chartType === "bigNumber"
      ) {
        this.setState({ colSize: "col-12" });
      }

      const chartId = this.props.chartId;
      const timeColumn = this.props.timeColumn;
      if (isNotEmpty(chartId) && isNotEmpty(timeColumn)) {
        const savedTimeColumn = timeColumn;
        let filteredList = [];
        filteredList.push({
          value: savedTimeColumn,
          label: savedTimeColumn,
        });
        this.setState({ defaultTimeColumn: filteredList });
      } else {
        //this.setState({ defaultTimeColumn: this.state.timeColumnOptions });
      }
    }

    if (prevProps.chartType !== this.props.chartType) {
      let chartType = this.props.chartType;
      if (chartType === "table" || chartType === "lineChart") {
        this.setState({ colSize: "col-6" });
      } else if (
        chartType === "barChart" ||
        chartType === "pieChart" ||
        chartType === "bubbleChart" ||
        chartType === "bigNumber"
      ) {
        this.setState({ colSize: "col-12" });
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {}

  /**
   * Time.TimeColumns
   * @param {*} inputValue
   * @returns
   */
  setTimeColumnOptions(data) {
    let timeColumnOptions = [];
    data.forEach((element) => {
      if (
        element["columnType"].toLowerCase() === "datetime" ||
        element["columnType"].toLowerCase() === "timestamp"
      ) {
        timeColumnOptions.push({
          value: element["columnName"],
          label: element["columnName"].toLowerCase(),
        });
      }
      this.setState({ timeColumnOptions: timeColumnOptions });
    });
  }
  filterTimeColumnOptions = (inputValue) => {
    return this.state.timeColumnOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  promiseTimeColumnOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterTimeColumnOptions(inputValue));
      }, 2000);
    });
  handleInputChangeTimeColumn = (selectedOption) => {
    if (selectedOption["value"]) {
      this.setState({ defaultTimeColumn: selectedOption });
      this.props.setTimeColumn(selectedOption["value"]);
    }
  };

  displayIcon() {
    this.setState({ isVisibleIcon: true });
  }
  hideIcon() {
    this.setState({ isVisibleIcon: false });
  }

  render() {
    const renderInfoTimeColumn = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        시간 컬럼을 시각화합니다. 테이블에서 DATETIME 컬럼을 표시합니다.
        필터(조건)에 적용됩니다.
      </Tooltip>
    );

    return (
      <div className={this.state.colSize} style={{ paddingBottom: 10 }}>
        <div className="row" style={{ paddingLeft: 20 }}>
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onMouseOver={this.displayIcon}
            onMouseOut={this.hideIcon}
          >
            <div align="left" style={{ float: "left" }}>
              Time Column
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
                overlay={renderInfoTimeColumn}
              >
                <i className="bi bi-info-circle"></i>
              </OverlayTrigger>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingLeft: 20 }}>
          <AsyncSelect
            value={this.state.defaultTimeColumn}
            cacheOptions
            defaultOptions
            loadOptions={this.promiseTimeColumnOptions}
            onChange={this.handleInputChangeTimeColumn}
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
  timeColumn: state.makeChartPanelLeft.timeColumn,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setTimeColumn: (data) => dispatch(action.setTimeColumn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeColumn);
