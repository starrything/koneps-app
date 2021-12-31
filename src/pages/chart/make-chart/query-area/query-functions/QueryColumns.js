import React from "react";
import AsyncSelect from "react-select/async";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isNotEmpty } from "~/utils/Valid";

class QueryColumns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      queryColumnOptions: [],
      defaultQueryColumns: [],
    };

    this.setQueryAreaByColumns = this.setQueryAreaByColumns.bind(this);

    // <!- Query Columns ->
    this.filterColumnOptions = this.filterColumnOptions.bind(this);
    this.promiseColumnOptions = this.promiseColumnOptions.bind(this);
    this.handleInputChangeColumnOptions =
      this.handleInputChangeColumnOptions.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    let datasetSpecs = this.props.datasetSpecs;
    this.setQueryAreaByColumns(datasetSpecs);

    if (isNotEmpty(this.props.chartId) && datasetSpecs.length > 0) {
      const savedQueryColumns = this.props.queryColumns;
      // let filteredItems = [];
      // datasetSpecs.forEach((element) => {
      //   // element : all elements from react-select List
      //   let filteredItem = savedQueryColumns.filter(
      //     (column) => element["columnName"] === column.value
      //   );
      //   if (filteredItem.length > 0) {
      //     filteredItems.push(filteredItem[0]);
      //   }
      // });
      let filteredList = [];
      // filteredItems.forEach((element) => {
      //   // Query.Columns OptionList
      //   filteredList.push({
      //     value: element["value"],
      //     label: element["value"].toLowerCase(),
      //   });
      // });
      savedQueryColumns.forEach((element) => {
        // Query.Columns OptionList
        filteredList.push({
          value: element["value"],
          label: element["value"].toLowerCase(),
        });
      });
      this.setState({ defaultQueryColumns: filteredList });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      let datasetSpecs = this.props.datasetSpecs;
      this.setQueryAreaByColumns(datasetSpecs);
      
      if (isNotEmpty(this.props.chartId) && datasetSpecs.length > 0) {
        const savedQueryColumns = this.props.queryColumns;
        // let filteredItems = [];
        // datasetSpecs.forEach((element) => {
        //   // element : all elements from react-select List
        //   let filteredItem = savedQueryColumns.filter(
        //     (column) => element["columnName"] === column.value
        //   );
        //   if (filteredItem.length > 0) {
        //     filteredItems.push(filteredItem[0]);
        //   }
        // });
        let filteredList = [];
        // filteredItems.forEach((element) => {
        //   // Query.Columns OptionList
        //   filteredList.push({
        //     value: element["value"],
        //     label: element["value"].toLowerCase(),
        //   });
        // });
        savedQueryColumns.forEach((element) => {
          // Query.Columns OptionList
          filteredList.push({
            value: element["value"],
            label: element["value"].toLowerCase(),
          });
        });
        this.setState({ defaultQueryColumns: filteredList });
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {}

  setQueryAreaByColumns(data) {
    let queryColumnOptions = [];

    if (data !== undefined && data.length > 0) {
      data.forEach((element) => {
        // Query.Columns OptionList
        queryColumnOptions.push({
          value: element["columnName"],
          label: element["columnName"].toLowerCase(),
        });
      });
      this.setState({ queryColumnOptions: queryColumnOptions });
    }
  }

  /**
   * Query.Columns
   * @param {*} inputValue
   * @returns
   */
  filterColumnOptions = (inputValue) => {
    return this.state.queryColumnOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  promiseColumnOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterColumnOptions(inputValue));
      }, 2000);
    });
  handleInputChangeColumnOptions = (selectedOption) => {
    if (selectedOption.length > 0) {
      let values = [];
      selectedOption.forEach((el, key) => {
        let set = { key: key, value: el["value"] };
        values.push(set);
      });
      this.setState({ defaultQueryColumns: selectedOption });
      this.props.setQueryColumns(values);
    } else {
      let values = [];
      this.setState({ defaultQueryColumns: values });
      this.props.setQueryColumns(values);
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col" style={{ paddingBottom: 10 }}>
          <div style={{ paddingLeft: 20 }}>Columns</div>
          <div style={{ paddingLeft: 20 }}>
            <AsyncSelect
              value={this.state.defaultQueryColumns}
              isMulti
              cacheOptions
              defaultOptions
              placeholder={"choose one or more"}
              loadOptions={this.promiseColumnOptions}
              onChange={this.handleInputChangeColumnOptions}
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
  queryColumns: state.makeChartPanelLeft.queryColumns,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setQueryColumns: (data) => dispatch(action.setQueryColumns(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryColumns);
