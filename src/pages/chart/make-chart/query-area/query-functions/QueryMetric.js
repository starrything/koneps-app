import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";

import AsyncSelect from "react-select/async";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isNotEmpty } from "~/utils/Valid";

class QueryMetric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      queryMetricsCode: [],
      queryMetricsOptions: [],
      queryMetricsCurrItem: "",
      defaultQueryMetric: {},
    };

    this.queryMetricsCodeKey = React.createRef();

    // <!- for Modal ->
    this.handleInputChange = this.handleInputChange.bind(this);

    this.setQueryAreaByColumns = this.setQueryAreaByColumns.bind(this);

    // <!- Query Metrics ->
    this.filterMetricsOptions = this.filterMetricsOptions.bind(this);
    this.promiseMetricsOptions = this.promiseMetricsOptions.bind(this);
    this.handleInputChangeMetricsOptions =
      this.handleInputChangeMetricsOptions.bind(this);

    // <!- Query Metrics Modal ->
    this.metricsComponentClickEvent =
      this.metricsComponentClickEvent.bind(this);
    this.metricsModalClose = this.metricsModalClose.bind(this);
    this.metricsModalSave = this.metricsModalSave.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.getQueryMetricsCode();
    let datasetSpecs = this.props.datasetSpecs;
    this.setQueryAreaByColumns(datasetSpecs);

    const chartId = this.props.chartId;
    const queryMetric = this.props.queryMetric;
    if (isNotEmpty(chartId) && Object.keys(queryMetric).length > 0) {
      const savedQueryMetric = queryMetric;
      let filteredItems = [];
      filteredItems.push(savedQueryMetric);

      let filteredList = [];
      filteredItems.forEach((element) => {
        // Query.Columns OptionList
        filteredList.push({
          value: element["column"],
          label: this.savedMetricsComponent(element),
        });
      });

      let metric = {
        value: savedQueryMetric["column"],
        label: this.savedMetricsComponent(savedQueryMetric),
      };
      this.setState({ defaultQueryMetric: metric });
    } else {
      this.setState({ defaultQueryMetric: null });
    }
  }

  savedMetricsComponent(element) {
    let modifiedBtnText = "";
    //TODO: Code API
    if (element["metrics"] === "AVG") {
      modifiedBtnText = "AVG(" + element["column"] + ")";
    } else if (element["metrics"] === "COUNT") {
      modifiedBtnText = "COUNT(" + element["column"] + ")";
    } else if (element["metrics"] === "COUNT_DISTINCT") {
      modifiedBtnText = "COUNT_DISTINCT(" + element["column"] + ")";
    } else if (element["metrics"] === "MIN") {
      modifiedBtnText = "MIN(" + element["column"] + ")";
    } else if (element["metrics"] === "MAX") {
      modifiedBtnText = "MAX(" + element["column"] + ")";
    } else if (element["metrics"] === "SUM") {
      modifiedBtnText = "SUM(" + element["column"] + ")";
    }

    return (
      <div role="button" tabIndex="0">
        <button
          type="button"
          placement="top"
          className="css-d2c85m label label-default"
          name={element["column"].toLowerCase()}
          id={"metrics-" + element["column"].toLowerCase()}
          value={element["column"].toLowerCase()}
          onClick={this.metricsComponentClickEvent}
        >
          {modifiedBtnText}
        </button>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      let datasetSpecs = this.props.datasetSpecs;
      this.setQueryAreaByColumns(datasetSpecs);

      const chartId = this.props.chartId;
      const queryMetric = this.props.queryMetric;
      if (isNotEmpty(chartId) && Object.keys(queryMetric).length > 0) {
        const savedQueryMetric = queryMetric;
        let filteredItems = [];
        filteredItems.push(savedQueryMetric);

        let filteredList = [];
        filteredItems.forEach((element) => {
          // Query.Columns OptionList
          filteredList.push({
            value: element["column"],
            label: this.savedMetricsComponent(element),
          });
        });

        let metric = {
          value: savedQueryMetric["column"],
          label: this.savedMetricsComponent(savedQueryMetric),
        };
        this.setState({ defaultQueryMetric: metric });
      } else {
        this.setState({ defaultQueryMetric: null });
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {}

  handleInputChange(event) {
    let fields = this.state.fields;
    let errors = {};

    const target = event.target;
    const name = target.name;
    fields[name] = target.type === "checkbox" ? target.checked : target.value;

    errors[target.name] = "";

    this.setState({
      errors: errors,
      fields: fields,
    });
  }

  getQueryMetricsCode() {
    // get code List => equals, not equal, greater than, ...
    let self = this;

    AxiosConfig.get("/api/code", {
      params: {
        code: "METRICS",
      },
    })
      .then(function (response) {
        // success
        let codeOptions = [];
        response.data.forEach((element) => {
          codeOptions.push({
            value: element["code"],
            label: element["value"],
          });
        });
        self.setState({ queryMetricsCode: codeOptions });
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  setQueryAreaByColumns(data) {
    let queryMetricsOptions = [];

    if (data !== undefined && data.length > 0) {
      data.forEach((element) => {
        // Query.Filters OptionList
        queryMetricsOptions.push({
          value: element["columnName"],
          // label: element["columnName"].toLowerCase(),
          label: this.metricsComponent(element),
        });
      });
      this.setState({ queryMetricsOptions: queryMetricsOptions });
    }
  }
  metricsComponent(element) {
    return (
      <div role="button" tabIndex="0">
        <button
          type="button"
          placement="top"
          className="css-d2c85m label label-default"
          name={element["columnName"].toLowerCase()}
          id={"metric-" + element["columnName"].toLowerCase()}
          value={element["columnName"].toLowerCase()}
          onClick={this.metricsComponentClickEvent}
        >
          {element["columnName"].toLowerCase()}
        </button>
      </div>
    );
  }
  metricsComponentClickEvent(e) {
    this.setState({ queryMetricsCurrItemName: e.target.name });
    this.setState({ queryMetricsCurrItem: e.target.value });
    this.setState({ metricsModalLeft: e.clientX });
    this.setState({ metricsModalShow: true });
  }
  metricsModalClose() {
    this.setState({ metricsModalShow: false });
  }
  metricsModalSave() {
    let queryMetricsCurrItemName = this.state.queryMetricsCurrItemName;
    let queryMetricsCodeKey = this.queryMetricsCodeKey.current.value;

    let queryFilterOption = {};
    queryFilterOption = {
      column: queryMetricsCurrItemName,
      metrics: queryMetricsCodeKey,
    };
    this.props.setQueryMetric(queryFilterOption);

    let modifiedBtnText = "";
    //TODO: Code API
    if (queryMetricsCodeKey === "AVG") {
      modifiedBtnText = "AVG(" + queryMetricsCurrItemName + ")";
    } else if (queryMetricsCodeKey === "COUNT") {
      modifiedBtnText = "COUNT(" + queryMetricsCurrItemName + ")";
    } else if (queryMetricsCodeKey === "COUNT_DISTINCT") {
      modifiedBtnText = "COUNT_DISTINCT(" + queryMetricsCurrItemName + ")";
    } else if (queryMetricsCodeKey === "MIN") {
      modifiedBtnText = "MIN(" + queryMetricsCurrItemName + ")";
    } else if (queryMetricsCodeKey === "MAX") {
      modifiedBtnText = "MAX(" + queryMetricsCurrItemName + ")";
    } else if (queryMetricsCodeKey === "SUM") {
      modifiedBtnText = "SUM(" + queryMetricsCurrItemName + ")";
    }

    console.log("metricsModalSave=====================================");
    console.log(queryMetricsCurrItemName);
    document.getElementById("metric-" + queryMetricsCurrItemName).value =
      modifiedBtnText;
    document.getElementById("metric-" + queryMetricsCurrItemName).innerText =
      modifiedBtnText;

    this.setState({ metricsModalShow: false });
  }

  /**
   * Query.Filters
   * @param {*} inputValue
   * @returns
   */
  filterMetricsOptions = (inputValue) => {
    return this.state.queryMetricsOptions.filter((i) =>
      // i.label.toLowerCase().includes(inputValue.toLowerCase())
      i.value.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  promiseMetricsOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterMetricsOptions(inputValue));
      }, 2000);
    });
  handleInputChangeMetricsOptions = (selectedOption) => {
    console.log(selectedOption);
    this.setState({ defaultQueryMetric: selectedOption });
  };

  render() {
    return (
      <div className="row">
        <div className="col" style={{ paddingBottom: 10 }}>
          <div style={{ paddingLeft: 20 }}>Metric</div>
          <div style={{ paddingLeft: 20 }}>
            <AsyncSelect
              value={this.state.defaultQueryMetric}
              cacheOptions
              defaultOptions
              isClearable="true"
              loadOptions={this.promiseMetricsOptions}
              onChange={this.handleInputChangeMetricsOptions}
            />
          </div>
        </div>
        {/* <!-- Modal: Query Filters Detail --> */}
        <Modal
          size="sm"
          show={this.state.metricsModalShow}
          onHide={this.metricsModalClose}
          style={{ left: "-10%", top: "60%" }}
        >
          <Modal.Body>
            <div className="container">
              <div className="mb-3 row">
                <div className="col-sm-12">
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.queryMetricsCurrItem}
                    disabled
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col-sm-12">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="queryMetricsCodeItem"
                    value={this.state.fields["queryMetricsCodeItem"]}
                    onChange={this.handleInputChange}
                    ref={this.queryMetricsCodeKey}
                  >
                    {this.state.queryMetricsCode.map((e, key) => {
                      return (
                        <option key={key} value={e.value}>
                          {e.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.metricsModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.metricsModalSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  chartId: state.datasetAndChartType.chartId,
  datasetSpecs: state.datasetAndChartType.datasetSpecs,
  queryMetric: state.makeChartPanelLeft.queryMetric,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setQueryMetric: (data) => dispatch(action.setQueryMetric(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryMetric);
