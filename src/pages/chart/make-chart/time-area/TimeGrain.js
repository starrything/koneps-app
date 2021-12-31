import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import AxiosConfig from "~/utils/AxiosConfig";
import AsyncSelect from "react-select/async";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isNotEmpty } from "~/utils/Valid";

class TimeGrain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      timeGrainOptions: [],
      defaultTimeGrain: [],
    };

    this.displayIcon = this.displayIcon.bind(this);
    this.hideIcon = this.hideIcon.bind(this);

    this.getTimeGrainCode = this.getTimeGrainCode.bind(this);

    // Time.TimeGrains
    this.filterTimeGrainOptions = this.filterTimeGrainOptions.bind(this);
    this.promiseTimeGrainOptions = this.promiseTimeGrainOptions.bind(this);
    this.handleInputChangeTimeGrain =
      this.handleInputChangeTimeGrain.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.getTimeGrainCode();

    let chartType = this.props.chartType;
    if (
      chartType === "table" ||
      chartType === "lineChart" ||
      chartType === "bigNumber"
    ) {
      this.setState({ isVisible: true });
    } else if (chartType === "barChart") {
      this.setState({ isVisible: false });
    }

    const chartId = this.props.chartId;
    const timeGrain = this.props.timeGrain;
    if (isNotEmpty(chartId) && isNotEmpty(timeGrain)) {
      const savedTimeGrain = timeGrain;
      let filteredList = [];
      filteredList.push({
        value: savedTimeGrain,
        label: savedTimeGrain.toLowerCase(),
      });
      this.setState({ defaultTimeGrain: filteredList });
    } else {
      this.setState({ defaultTimeGrain: null });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      // Update state
      console.log("check Time Grain!");
      let chartType = this.props.chartType;
      if (chartType === "table" || chartType === "lineChart") {
        this.setState({ isVisible: true });
      } else if (
        chartType === "barChart" ||
        chartType === "pieChart" ||
        chartType === "bubbleChart" ||
        chartType === "bigNumber"
      ) {
        this.setState({ isVisible: false });
      }

      const chartId = this.props.chartId;
      const timeGrain = this.props.timeGrain;
      if (isNotEmpty(chartId) && isNotEmpty(timeGrain)) {
        const savedTimeGrain = timeGrain;
        let filteredList = [];
        filteredList.push({
          value: savedTimeGrain,
          label: savedTimeGrain.toLowerCase(),
        });
        this.setState({ defaultTimeGrain: filteredList });
      } else {
        this.setState({ defaultTimeGrain: null });
      }
    }

    if (prevProps.chartType !== this.props.chartType) {
      console.log("check Time Grain!");
      let chartType = this.props.chartType;
      if (chartType === "table" || chartType === "lineChart") {
        this.setState({ isVisible: true });
      } else if (
        chartType === "barChart" ||
        chartType === "pieChart" ||
        chartType === "bubbleChart" ||
        chartType === "bigNumber"
      ) {
        this.setState({ isVisible: false });
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {}

  getTimeGrainCode() {
    let self = this;

    AxiosConfig.get("/api/code", {
      params: {
        code: "TIME_GRAIN",
      },
    })
      .then(function (response) {
        // success
        //self.setCodeList("time-grain", response.data);
        let codeOptions = [];
        response.data.forEach((element) => {
          codeOptions.push({
            value: element["code"],
            label: element["value"].toLowerCase(),
          });
          self.setState({ timeGrainOptions: codeOptions });
        });
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  //Time.TimeGrain
  filterTimeGrainOptions = (inputValue) => {
    return this.state.timeGrainOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  promiseTimeGrainOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterTimeGrainOptions(inputValue));
      }, 2000);
    });
  handleInputChangeTimeGrain = (selectedOption) => {
    if (isNotEmpty(selectedOption)) {
      this.props.setTimeGrain(selectedOption["value"]);
      this.setState({ defaultTimeGrain: selectedOption });
    }
  };

  displayIcon() {
    this.setState({ isVisibleIcon: true });
  }
  hideIcon() {
    this.setState({ isVisibleIcon: false });
  }

  render() {
    const renderInfoTimeGrain = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        시각화에서 시간의 단위입니다. 날짜 변환을 적용하여 시간 열을 변경하고
        새로운 시간 단위를 정의합니다.
      </Tooltip>
    );

    return (
      <div
        className="col-6"
        style={{
          paddingBottom: 10,
          display: this.state.isVisible ? "block" : "none",
        }}
      >
        <div className="row" style={{ paddingLeft: 20 }}>
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onMouseOver={this.displayIcon}
            onMouseOut={this.hideIcon}
          >
            <div align="left" style={{ float: "left" }}>
              Time Grain
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
                overlay={renderInfoTimeGrain}
              >
                <i className="bi bi-info-circle"></i>
              </OverlayTrigger>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingLeft: 20 }}>
          <AsyncSelect
            value={this.state.defaultTimeGrain}
            cacheOptions
            defaultOptions
            loadOptions={this.promiseTimeGrainOptions}
            onChange={this.handleInputChangeTimeGrain}
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
  timeGrain: state.makeChartPanelLeft.timeGrain,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setTimeGrain: (data) => dispatch(action.setTimeGrain(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeGrain);
