import React from "react";
import AsyncSelect from "react-select/async";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isNotEmpty } from "~/utils/Valid";

class QueryGroupBy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      queryGroupByOptions: [],
      defaultQueryGroupBy: [],
    };

    this.setQueryAreaByColumns = this.setQueryAreaByColumns.bind(this);

    // <!- Query Group By ->
    this.filterGroupByOptions = this.filterGroupByOptions.bind(this);
    this.promiseGroupByOptions = this.promiseGroupByOptions.bind(this);
    this.handleInputChangeGroupByOptions =
      this.handleInputChangeGroupByOptions.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    let datasetSpecs = this.props.datasetSpecs;
    this.setQueryAreaByColumns(datasetSpecs);

    if (isNotEmpty(this.props.chartId) && this.props.queryGroupBy.length > 0) {
      const savedQueryGroupBy = this.props.queryGroupBy;
      let filteredItems = [];
      datasetSpecs.forEach((element) => {
        // element : all elements from react-select List
        let filteredItem = savedQueryGroupBy.filter(
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
      this.setState({ defaultQueryGroupBy: filteredList });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      let datasetSpecs = this.props.datasetSpecs;
      this.setQueryAreaByColumns(datasetSpecs);

      if (isNotEmpty(this.props.chartId) && datasetSpecs.length > 0) {
        const savedQueryGroupBy = this.props.queryGroupBy;
        let filteredItems = [];
        datasetSpecs.forEach((element) => {
          // element : all elements from react-select List
          let filteredItem = savedQueryGroupBy.filter(
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
        this.setState({ defaultQueryGroupBy: filteredList });
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {}

  setQueryAreaByColumns(data) {
    let queryGroupByOptions = [];

    if (data !== undefined && data.length > 0) {
      data.forEach((element) => {
        // Query.Series OptionList
        queryGroupByOptions.push({
          value: element["columnName"],
          label: element["columnName"].toLowerCase(),
        });
      });
      this.setState({ queryGroupByOptions: queryGroupByOptions });
    }
  }

  /**
   * Query.Series
   * @param {*} inputValue
   * @returns
   */
  filterGroupByOptions = (inputValue) => {
    return this.state.queryGroupByOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  promiseGroupByOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterGroupByOptions(inputValue));
      }, 2000);
    });
  handleInputChangeGroupByOptions = (selectedOption) => {
    if (selectedOption.length > 0) {
      let values = [];
      selectedOption.forEach((el, key) => {
        let set = { key: key, value: el["value"] };
        values.push(set);
      });
      this.props.setQueryGroupBy(values);
      this.setState({ defaultQueryGroupBy: selectedOption });
    } else {
      let values = [];
      this.props.setQueryGroupBy(values);
      this.setState({ defaultQueryGroupBy: selectedOption });
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col" style={{ paddingBottom: 10 }}>
          <div style={{ paddingLeft: 20 }}>Group By</div>
          <div style={{ paddingLeft: 20 }}>
            <AsyncSelect
              value={this.state.defaultQueryGroupBy}
              isMulti
              cacheOptions
              defaultOptions
              placeholder={"choose one or more"}
              loadOptions={this.promiseGroupByOptions}
              onChange={this.handleInputChangeGroupByOptions}
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
  chartType: state.datasetAndChartType.chartType,
  queryGroupBy: state.makeChartPanelLeft.queryGroupBy,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setQueryGroupBy: (data) => dispatch(action.setQueryGroupBy(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryGroupBy);
