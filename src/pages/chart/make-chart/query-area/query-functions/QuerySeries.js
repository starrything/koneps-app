import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import AsyncSelect from "react-select/async";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isNotEmpty } from "~/utils/Valid";

class QuerySeries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      querySeriesOptions: [],
      defaultQuerySeries: [],
    };

    this.displayIcon = this.displayIcon.bind(this);
    this.hideIcon = this.hideIcon.bind(this);

    this.setQueryAreaByColumns = this.setQueryAreaByColumns.bind(this);

    // <!- Query Series ->
    this.filterSeriesOptions = this.filterSeriesOptions.bind(this);
    this.promiseSeriesOptions = this.promiseSeriesOptions.bind(this);
    this.handleInputChangeSeriesOptions =
      this.handleInputChangeSeriesOptions.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    let datasetSpecs = this.props.datasetSpecs;
    this.setQueryAreaByColumns(datasetSpecs);

    if (isNotEmpty(this.props.chartId) && this.props.querySeries.length > 0) {
      const savedQuerySeries = this.props.querySeries;
      let filteredItems = [];
      datasetSpecs.forEach((element) => {
        // element : all elements from react-select List
        let filteredItem = savedQuerySeries.filter(
          (column) => element["columnName"] === column.value
        );
        if (filteredItem.length > 0) {
          filteredItems.push(filteredItem[0]);
        }
      });
      let filteredList = [];
      filteredItems.forEach((element) => {
        // Query.Columns OptionList
        filteredList.push({
          value: element["value"],
          label: element["value"].toLowerCase(),
        });
      });
      this.setState({ defaultQuerySeries: filteredList });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      let datasetSpecs = this.props.datasetSpecs;
      this.setQueryAreaByColumns(datasetSpecs);

      if (isNotEmpty(this.props.chartId) && datasetSpecs.length > 0) {
        const savedQuerySeries = this.props.querySeries;
        let filteredItems = [];
        datasetSpecs.forEach((element) => {
          // element : all elements from react-select List
          let filteredItem = savedQuerySeries.filter(
            (column) => element["columnName"] === column.value
          );
          if (filteredItem.length > 0) {
            filteredItems.push(filteredItem[0]);
          }
        });
        let filteredList = [];
        filteredItems.forEach((element) => {
          // Query.Columns OptionList
          filteredList.push({
            value: element["value"],
            label: element["value"].toLowerCase(),
          });
        });
        this.setState({ defaultQuerySeries: filteredList });
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {}

  setQueryAreaByColumns(data) {
    let querySeriesOptions = [];

    if (data !== undefined && data.length > 0) {
      data.forEach((element) => {
        // Query.Series OptionList
        querySeriesOptions.push({
          value: element["columnName"],
          label: element["columnName"].toLowerCase(),
        });
      });
      this.setState({ querySeriesOptions: querySeriesOptions });
    }
  }

  /**
   * Query.Series
   * @param {*} inputValue
   * @returns
   */
  filterSeriesOptions = (inputValue) => {
    return this.state.querySeriesOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  promiseSeriesOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterSeriesOptions(inputValue));
      }, 2000);
    });
  handleInputChangeSeriesOptions = (selectedOption) => {
    if (selectedOption.length > 0) {
      let values = [];
      selectedOption.forEach((el, key) => {
        let set = { key: key, value: el["value"] };
        values.push(set);
      });
      this.props.setQuerySeries(values);
      this.setState({ defaultQuerySeries: selectedOption });
    } else {
      let values = [];
      this.setState({ defaultQuerySeries: values });
      this.props.setQuerySeries(values);
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
        그룹화 컬럼을 선택합니다.
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
              value={this.state.defaultQuerySeries}
              isMulti
              cacheOptions
              defaultOptions
              isClearable="true"
              placeholder={"choose one or more"}
              loadOptions={this.promiseSeriesOptions}
              onChange={this.handleInputChangeSeriesOptions}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  chartId: state.datasetAndChartType.chartId,
  datasetSpecs: state.datasetAndChartType.datasetSpecs,
  querySeries: state.makeChartPanelLeft.querySeries,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setQuerySeries: (data) => dispatch(action.setQuerySeries(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuerySeries);
