import React from "react";
import AsyncSelect from "react-select/async";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isNotEmpty } from "~/utils/Valid";

class QueryOrdering extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      queryOrderingOptions: [],
      defaultQueryOrdering: [],
    };

    this.setQueryAreaByColumns = this.setQueryAreaByColumns.bind(this);

    // <!- Query Ordering ->
    this.filterOrderingOptions = this.filterOrderingOptions.bind(this);
    this.promiseOrderingOptions = this.promiseOrderingOptions.bind(this);
    this.handleInputChangeOrderingOptions =
      this.handleInputChangeOrderingOptions.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    let datasetSpecs = this.props.datasetSpecs;
    this.setQueryAreaByColumns(datasetSpecs);

    if (isNotEmpty(this.props.chartId) && datasetSpecs.length > 0) {
      const savedQueryOrdering = this.props.queryOrdering;
      let filteredItems = [];
      datasetSpecs.forEach((element) => {
        // element : all elements from react-select List
        let filteredItem = savedQueryOrdering.filter(
          (column) => element["columnName"] === column.value.split("[")[0]
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
          label: element["value"].split("[")[0] + " [" + element["value"].split("[")[1],
        });
      });
      this.setState({ defaultQueryOrdering: filteredList });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      let datasetSpecs = this.props.datasetSpecs;
      this.setQueryAreaByColumns(datasetSpecs);

      if (isNotEmpty(this.props.chartId) && datasetSpecs.length > 0) {
        const savedQueryOrdering = this.props.queryOrdering;
        let filteredItems = [];
        datasetSpecs.forEach((element) => {
          // element : all elements from react-select List
          let filteredItem = savedQueryOrdering.filter(
            (column) => element["columnName"] === column.value.split("[")[0]
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
            label: element["value"].split("[")[0] + " [" + element["value"].split("[")[1],
          });
        });
        this.setState({ defaultQueryOrdering: filteredList });
      }
    }
  }

  setQueryAreaByColumns(data) {
    let queryOrderingOptions = [];

    if (data !== undefined && data.length > 0) {
      data.forEach((element) => {
        // Query.Ordering OptionList
        queryOrderingOptions.push({
          value: element["columnName"] + "[asc]",
          label: element["columnName"].toLowerCase() + " [asc]",
        });
        queryOrderingOptions.push({
          value: element["columnName"] + "[desc]",
          label: element["columnName"].toLowerCase() + " [desc]",
        });
      });
      this.setState({ queryOrderingOptions: queryOrderingOptions });
    }
  }

  /**
   * Query.Ordering
   * @param {*} inputValue
   * @returns
   */
  filterOrderingOptions = (inputValue) => {
    return this.state.queryOrderingOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  promiseOrderingOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterOrderingOptions(inputValue));
      }, 2000);
    });
  handleInputChangeOrderingOptions = (selectedOption) => {
    console.log(selectedOption);
    if (selectedOption.length > 0) {
      let values = [];
      selectedOption.forEach((el, key) => {
        let set = { key: key, value: el["value"] };
        values.push(set);
      });
      this.setState({ defaultQueryOrdering: selectedOption });
      this.props.setQueryOrdering(values);
    } else {
      let values = [];
      this.setState({ defaultQueryOrdering: values });
      this.props.setQueryOrdering(values);
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col" style={{ paddingBottom: 10 }}>
          <div style={{ paddingLeft: 20 }}>Ordering</div>
          <div style={{ paddingLeft: 20 }}>
            <AsyncSelect
              value={this.state.defaultQueryOrdering}
              isMulti
              cacheOptions
              defaultOptions
              placeholder={"choose one or more"}
              loadOptions={this.promiseOrderingOptions}
              onChange={this.handleInputChangeOrderingOptions}
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
  queryOrdering: state.makeChartPanelLeft.queryOrdering,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setQueryOrdering: (data) => dispatch(action.setQueryOrdering(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryOrdering);
