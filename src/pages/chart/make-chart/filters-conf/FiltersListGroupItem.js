import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { connect } from "react-redux";
import { resetStore, resetLeftControlPanel } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isEmpty, isNotEmpty } from "~/utils/Valid";

import AsyncSelect from "react-select/async";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

class FiltersListGroupItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      filterBoxItem: "",
      filterBox: {},
      queryColumnOptions: [],
    };

    this.popOverBtn = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);

    this.confirmBtn = this.confirmBtn.bind(this);

    this.removeListGroupItem = this.removeListGroupItem.bind(this);

    this.setQueryAreaByColumns = this.setQueryAreaByColumns.bind(this);

    // <!- Query Columns ->
    this.filterColumnOptions = this.filterColumnOptions.bind(this);
    this.promiseColumnOptions = this.promiseColumnOptions.bind(this);
    this.handleInputChangeColumnOptions =
      this.handleInputChangeColumnOptions.bind(this);
  }

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

  confirmBtn() {
    let filterBox = {};
    filterBox = {
      filterBoxKey: this.props.filterKey,
      filterBoxColumn: this.state.fields["filterBoxColumn"],
      filterBoxLabel: this.state.fields["filterBoxLabel"],
    };
    this.setState({ filterBox: filterBox });
    this.setState({ filterBoxItem: this.state.fields["filterBoxColumn"] });

    this.popOverBtn.current.click(); // hide popOver

    let filtersConfiguration = this.props.filtersConfiguration;
    //TODO: delete item
    let i = 0;
    while (i < filtersConfiguration.length) {
      if (
        filtersConfiguration[i]["filterBoxKey"] ===
        this.state.filterBox["filterBoxKey"]
      ) {
        filtersConfiguration.splice(i, 1);
      } else {
        ++i;
      }
    }
    filtersConfiguration.push(filterBox);
    this.props.setFiltersConfiguration(filtersConfiguration);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    let datasetSpecs = this.props.datasetSpecs;
    this.setQueryAreaByColumns(datasetSpecs);

    const chartId = this.props.chartId;
    const filterBoxLabel = this.props.filterBoxLabel;
    const filterBoxColumn = this.props.filterBoxColumn;
    // if (isNotEmpty(chartId) && isNotEmpty(filterBoxLabel)) {
    //   let filterBox = {};
    //   filterBox = {
    //     filterBoxKey: this.props.filterKey,
    //     filterBoxColumn: filterBoxColumn,
    //     filterBoxLabel: filterBoxLabel,
    //   };
    //   this.setState({ filterBox: filterBox });
    //   this.setState({ filterBoxItem: filterBoxColumn });
    // } else {
    //   let filterBox = {};
    //   filterBox = {
    //     filterBoxKey: this.props.filterKey,
    //     filterBoxColumn: filterBoxColumn,
    //     filterBoxLabel: filterBoxLabel,
    //   };
    //   this.setState({ filterBox: filterBox });
    //   this.setState({ filterBoxItem: filterBoxColumn });
    // }
    let filterBox = {};
    filterBox = {
      filterBoxKey: this.props.filterKey,
      filterBoxColumn: filterBoxColumn,
      filterBoxLabel: filterBoxLabel,
    };
    this.setState({ filterBox: filterBox });
    this.setState({ filterBoxItem: filterBoxColumn });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      let datasetSpecs = this.props.datasetSpecs;
      this.setQueryAreaByColumns(datasetSpecs);

      const chartId = this.props.chartId;
      const filterBoxLabel = this.props.filterBoxLabel;
      const filterBoxColumn = this.props.filterBoxColumn;
      let filterBox = {};
      filterBox = {
        filterBoxKey: this.props.filterKey,
        filterBoxColumn: filterBoxColumn,
        filterBoxLabel: filterBoxLabel,
      };
      this.setState({ filterBox: filterBox });
      this.setState({ filterBoxItem: filterBoxColumn });
    }

    if (prevProps.chartType !== this.props.chartType) {
      this.props.resetLeftControlPanel();
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
    console.log(selectedOption.value);

    let fields = this.state.fields;
    fields["filterBoxColumn"] = selectedOption.value;

    this.setState({ fields: fields });
  };

  removeListGroupItem(event) {
    let numFilterBox = this.props.numFilterBox - 1;
    this.props.setFilterBoxNumber(numFilterBox);

    console.log(this.state.filterBox);
    console.log(this.state.filterBox["filterBoxKey"]);
    let filtersConfiguration = this.props.filtersConfiguration;
    //TODO: delete item
    let i = 0;
    while (i < filtersConfiguration.length) {
      if (
        filtersConfiguration[i]["filterBoxKey"] ===
        this.state.filterBox["filterBoxKey"]
      ) {
        filtersConfiguration.splice(i, 1);
      } else {
        ++i;
      }
    }
    this.props.setFiltersConfiguration(filtersConfiguration);

    // Call FiltersConfiguration.deleteFilterBox(filterKey)
    this.props.deleteItem(this.props.filterKey);
  }

  render() {
    return (
      <div className="list-group-item" style={{ position: "relative" }}>
        <div className="item-left" align="left" style={{ float: "left" }}>
          {this.state.filterBoxItem.length > 0
            ? this.state.filterBoxItem
            : "N/A"}{" "}
          &nbsp;
          <OverlayTrigger
            placement="right"
            trigger="click"
            overlay={
              <Popover style={{ width: "400px", maxWidth: "400px" }}>
                <Popover.Title as="h3">Filter Configuration</Popover.Title>
                <Popover.Content style={{ width: "400px", maxWidth: "400px" }}>
                  <div className="row" style={{ padding: 5 }}>
                    <label
                      className="col-sm-3 col-form-label"
                      for="timeRangeLastDay"
                    >
                      Column
                    </label>
                    <div className="col-sm-9">
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        placeholder={"choose one or more"}
                        loadOptions={this.promiseColumnOptions}
                        onChange={this.handleInputChangeColumnOptions}
                      />
                    </div>
                  </div>
                  <div className="row" style={{ padding: 5 }}>
                    <label
                      className="col-sm-3 col-form-label"
                      for="filterBoxLabel"
                    >
                      Label
                    </label>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        type="text"
                        name="filterBoxLabel"
                        id="filterBoxLabel"
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="p-3" />
                    <div style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={this.confirmBtn}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </Popover.Content>
              </Popover>
            }
          >
            <i
              className="bi bi-pencil-square"
              style={{ cursor: "pointer" }}
              ref={this.popOverBtn}
            ></i>
          </OverlayTrigger>
        </div>
        <div className="item-right" align="right" style={{ float: "right" }}>
          <i
            className="bi bi-x text-primary"
            style={{ cursor: "pointer" }}
            onClick={(e) => this.removeListGroupItem(e)}
          ></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  chartId: state.datasetAndChartType.chartId,
  chartType: state.datasetAndChartType.chartType,
  datasetSpecs: state.datasetAndChartType.datasetSpecs,
  numFilterBox: state.makeChartPanelLeft.numFilterBox,
  filtersConfiguration: state.makeChartPanelLeft.filtersConfiguration,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  resetLeftControlPanel: () => dispatch(resetLeftControlPanel()),
  setFilterBoxNumber: (data) => dispatch(action.setFilterBoxNumber(data)),
  setFiltersConfiguration: (data) =>
    dispatch(action.setFiltersConfiguration(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersListGroupItem);
