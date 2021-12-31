import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
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
      timeRangeKeyValue: { key: "month", value: "Last month" },
      selectedTimeRange: "month",
    };

    this.displayIcon = this.displayIcon.bind(this);
    this.hideIcon = this.hideIcon.bind(this);

    this.timeRange = React.createRef();
    // Time.Range
    this.onTimeRangeChange = this.onTimeRangeChange.bind(this);
    this.confirmTimeRange = this.confirmTimeRange.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    if (isNotEmpty(this.props.chartId) && isNotEmpty(this.props.timeRange)) {
      let timeRangeKey = this.props.timeRange;
      let timeRangeValue = "";
    if (timeRangeKey === "day") {
      timeRangeValue = "Last day";
    } else if (timeRangeKey === "week") {
      timeRangeValue = "Last week";
    } else if (timeRangeKey === "month") {
      timeRangeValue = "Last month";
    } else if (timeRangeKey === "quarter") {
      timeRangeValue = "Last quarter";
    } else if (timeRangeKey === "year") {
      timeRangeValue = "Last year";
    } else if (timeRangeKey === "noFilter") {
      timeRangeValue = "No filter";
    }

    let timeRangeKeyValue = {};
    timeRangeKeyValue = { key: timeRangeKey, value: timeRangeValue };
      this.setState({timeRangeKeyValue: timeRangeKeyValue})
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
    }
  }

  // Time.Range
  onTimeRangeChange(e) {
    let currTimeRangeValue = this.state.timeRangeKeyValue.value;
    this.setState({
      selectedTimeRange: e.target.value,
      timeRangeKeyValue: { key: e.target.value, value: currTimeRangeValue },
    });
  }
  //
  confirmTimeRange() {
    let timeRangeKeyValue = {};
    let timeRangeKey = this.state.selectedTimeRange;
    let timeRangeValue = "";
    if (timeRangeKey === "day") {
      timeRangeValue = "Last day";
    } else if (timeRangeKey === "week") {
      timeRangeValue = "Last week";
    } else if (timeRangeKey === "month") {
      timeRangeValue = "Last month";
    } else if (timeRangeKey === "quarter") {
      timeRangeValue = "Last quarter";
    } else if (timeRangeKey === "year") {
      timeRangeValue = "Last year";
    } else if (timeRangeKey === "noFilter") {
      timeRangeValue = "No filter";
    }

    timeRangeKeyValue = { key: timeRangeKey, value: timeRangeValue };
    this.setState({ timeRangeKeyValue: timeRangeKeyValue });
    this.props.setTimeRange(timeRangeKey);

    this.timeRange.current.click();
  }

  displayIcon() {
    this.setState({ isVisibleIcon: true });
  }
  hideIcon() {
    this.setState({ isVisibleIcon: false });
  }

  render() {
    const renderInfoTimeRange = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        시각화의 시간 범위입니다.
      </Tooltip>
    );

    return (
      <div className="row">
        <div className="col" style={{ paddingBottom: 10 }}>
          <div className="row" style={{ paddingLeft: 20 }}>
            <div
              style={{ position: "relative", cursor: "pointer" }}
              onMouseOver={this.displayIcon}
              onMouseOut={this.hideIcon}
            >
              <div align="left" style={{ float: "left" }}>
                Time Range
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
                  overlay={renderInfoTimeRange}
                >
                  <i className="bi bi-info-circle"></i>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          <div style={{ paddingLeft: 20 }}>
            <OverlayTrigger
              placement="right"
              trigger="click"
              overlay={
                <Popover>
                  <Popover.Content>
                    <div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="timeRange"
                          id="timeRangeLastDay"
                          value="day"
                          onChange={this.onTimeRangeChange}
                          checked={this.state.timeRangeKeyValue.key === "day"}
                        />
                        <label
                          className="form-check-label"
                          for="timeRangeLastDay"
                        >
                          Last day
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="timeRange"
                          id="timeRangeLastWeek"
                          value="week"
                          onChange={this.onTimeRangeChange}
                          checked={this.state.timeRangeKeyValue.key === "week"}
                        />
                        <label
                          className="form-check-label"
                          for="timeRangeLastWeek"
                        >
                          Last week
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="timeRange"
                          id="timeRangeLastMonth"
                          value="month"
                          onChange={this.onTimeRangeChange}
                          checked={this.state.timeRangeKeyValue.key === "month"}
                        />
                        <label
                          className="form-check-label"
                          for="timeRangeLastMonth"
                        >
                          Last month
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="timeRange"
                          id="timeRangeLastQuarter"
                          value="quarter"
                          onChange={this.onTimeRangeChange}
                          checked={
                            this.state.timeRangeKeyValue.key === "quarter"
                          }
                        />
                        <label
                          className="form-check-label"
                          for="timeRangeLastQuarter"
                        >
                          Last quarter
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="timeRange"
                          id="timeRangeLastYear"
                          value="year"
                          onChange={this.onTimeRangeChange}
                          checked={this.state.timeRangeKeyValue.key === "year"}
                        />
                        <label
                          className="form-check-label"
                          for="timeRangeLastYear"
                        >
                          Last year
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="timeRange"
                          id="timeRangeNoFilter"
                          value="noFilter"
                          onChange={this.onTimeRangeChange}
                          checked={
                            this.state.timeRangeKeyValue.key === "noFilter"
                          }
                        />
                        <label
                          className="form-check-label"
                          for="timeRangeNoFilter"
                        >
                          No filter
                        </label>
                      </div>
                      <div className="p-3" />
                      <div style={{ textAlign: "right" }}>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={this.confirmTimeRange}
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </Popover.Content>
                </Popover>
              }
            >
              <Button variant="secondary btn-sm" ref={this.timeRange}>
                {this.state.timeRangeKeyValue.value}
              </Button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  chartId: state.datasetAndChartType.chartId,
  datasetSpecs: state.datasetAndChartType.datasetSpecs,
  timeRange: state.makeChartPanelLeft.timeRange,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setTimeRange: (data) => dispatch(action.setTimeRange(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeGrain);
