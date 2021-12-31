import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";

import AsyncSelect from "react-select/async";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isEmpty, isNotEmpty } from "~/utils/Valid";

class QueryFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      queryFilterCode: [],
      queryFilterOptions: [],
      queryFilterCurrItem: "",
      queryFilterToStore: [],
      defaultQueryFilters: [],
    };

    this.queryFilterCodeKey = React.createRef();
    this.queryFilterCodeInput = React.createRef();

    // <!- for Modal ->
    this.handleInputChange = this.handleInputChange.bind(this);

    this.setQueryAreaByColumns = this.setQueryAreaByColumns.bind(this);

    // <!- Query Filters ->
    this.filterQueryFilterOptions = this.filterQueryFilterOptions.bind(this);
    this.promiseQueryFilterOptions = this.promiseQueryFilterOptions.bind(this);
    this.handleInputChangeQueryFilterOptions =
      this.handleInputChangeQueryFilterOptions.bind(this);

    // <!- Query Filters Modal ->
    this.filterComponent = this.filterComponent.bind(this);
    this.filterComponentClickEvent = this.filterComponentClickEvent.bind(this);
    this.filterModalClose = this.filterModalClose.bind(this);
    this.filterModalSave = this.filterModalSave.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.getQueryFilterCode();
    let datasetSpecs = this.props.datasetSpecs;
    this.setQueryAreaByColumns(datasetSpecs);

    console.log("queryFilters - componentDidMount()");
    console.log("chartId: " + this.props.chartId);
    console.log("datasetSpecs: " + datasetSpecs);
    console.log("savedQueryFilters: " + this.props.queryFilters);
    if (isNotEmpty(this.props.chartId) && datasetSpecs.length > 0) {
      const savedQueryFilters = this.props.queryFilters;
      let filteredItems = [];
      datasetSpecs.forEach((element) => {
        // element : all elements from react-select List
        let filteredItem = savedQueryFilters.filter(
          (filter) => element["columnName"].toLowerCase() === filter.column.toLowerCase()
        );
        if (filteredItem.length > 0) {
          filteredItems.push(filteredItem[0]);
        }
      });
      let filteredList = [];
      filteredItems.forEach((element) => {
        // Query.Columns OptionList
        filteredList.push({
          value: element["column"],
          label: this.savedFilterComponent(element),
        });
      });

      console.log(filteredList);
      this.setState({ queryFilterToStore: savedQueryFilters });
      this.setState({ defaultQueryFilters: filteredList });
    }
  }

  savedFilterComponent(element) {
    let modifiedBtnText = "";
    //TODO: Code API
    if (element["filter"] === "EQUALS") {
      modifiedBtnText = element["column"] + " = " + element["input"];
    } else if (element["filter"] === "NOT_EQUAL") {
      modifiedBtnText = element["column"] + " <> " + element["input"];
    } else if (element["filter"] === "GREATER_THAN") {
      modifiedBtnText = element["column"] + " > " + element["input"];
    } else if (element["filter"] === "LESS_THEN") {
      modifiedBtnText = element["column"] + " < " + element["input"];
    } else if (element["filter"] === "GREATER_THAN_EQUAL") {
      modifiedBtnText = element["column"] + " >= " + element["input"];
    } else if (element["filter"] === "LESS_THEN_EQUAL") {
      modifiedBtnText = element["column"] + " <= " + element["input"];
    } else if (element["filter"] === "IN") {
      modifiedBtnText = element["column"] + " in ('" + element["input"] + "')";
    } else if (element["filter"] === "NOT_IN") {
      modifiedBtnText =
        element["column"] + " not in ('" + element["input"] + "')";
    } else if (element["filter"] === "LIKE") {
      modifiedBtnText = element["column"] + " like " + element["input"];
    } else if (element["filter"] === "IS_NOT_NULL") {
      modifiedBtnText = element["column"] + " is not null " + element["input"];
    } else if (element["filter"] === "IS_NULL") {
      modifiedBtnText = element["column"] + " is null " + element["input"];
    }

    return (
      <div role="button" tabIndex="0">
        <button
          type="button"
          placement="top"
          className="css-d2c85m label label-default"
          name={element["column"].toLowerCase()}
          id={"filter-" + element["column"].toLowerCase()}
          value={element["column"].toLowerCase()}
          onClick={this.filterComponentClickEvent}
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

      console.log("queryFilters - componentDidUpdate()");
      console.log("chartId: " + this.props.chartId);
      console.log("datasetSpecs: " + datasetSpecs);
      console.log("savedQueryFilters: " + this.props.queryFilters);
      if (isNotEmpty(this.props.chartId) && datasetSpecs.length > 0) {
        const savedQueryFilters = this.props.queryFilters;
        let filteredItems = [];
        datasetSpecs.forEach((element) => {
          // element : all elements from react-select List
          let filteredItem = savedQueryFilters.filter(
            (filter) => element["columnName"].toLowerCase() === filter.column.toLowerCase()
          );
          if (filteredItem.length > 0) {
            filteredItems.push(filteredItem[0]);
          }
        });
        let filteredList = [];
        filteredItems.forEach((element) => {
          // Query.Columns OptionList
          filteredList.push({
            value: element["column"],
            label: this.savedFilterComponent(element),
          });
        });

        console.log(filteredList);
        this.setState({ queryFilterToStore: savedQueryFilters });
        this.setState({ defaultQueryFilters: filteredList });
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

  getQueryFilterCode() {
    // get code List => equals, not equal, greater than, ...
    let self = this;

    AxiosConfig.get("/api/code", {
      params: {
        code: "QUERY_FILTERS",
      },
    })
      .then(function (response) {
        // success
        let codeOptions = [];
        response.data.forEach((element) => {
          codeOptions.push({
            value: element["code"],
            label: element["value"].toLowerCase(),
          });
        });
        self.setState({ queryFilterCode: codeOptions });
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  setQueryAreaByColumns(data) {
    let queryFilterOptions = [];

    if (data !== undefined && data.length > 0) {
      data.forEach((element) => {
        // Query.Filters OptionList
        queryFilterOptions.push({
          value: element["columnName"],
          // label: element["columnName"].toLowerCase(),
          label: this.filterComponent(element),
        });
      });
      this.setState({ queryFilterOptions: queryFilterOptions });
    }
  }
  filterComponent(element) {
    return (
      <div role="button" tabIndex="0">
        <button
          type="button"
          placement="top"
          className="css-d2c85m label label-default"
          name={element["columnName"].toLowerCase()}
          id={"filter-" + element["columnName"].toLowerCase()}
          value={element["columnName"].toLowerCase()}
          onClick={this.filterComponentClickEvent}
        >
          {element["columnName"].toLowerCase()}
        </button>
      </div>
    );
  }
  filterComponentClickEvent(e) {
    this.setState({ queryFilterCurrItemName: e.target.name });
    this.setState({ queryFilterCurrItem: e.target.value });
    this.setState({ filterModalLeft: e.clientX });
    this.setState({ filterModalShow: true });
  }
  filterModalClose() {
    this.setState({ filterModalShow: false });
  }
  filterModalSave() {
    let queryFilterCurrItemName = this.state.queryFilterCurrItemName;
    let queryFilterCodeKey = this.queryFilterCodeKey.current.value;
    let queryFilterCodeInput = this.queryFilterCodeInput.current.value;

    let queryFilterToStore = this.state.queryFilterToStore;
    let queryFilterSequence = queryFilterToStore.length;
    let queryFilterOption = {};
    queryFilterOption = {
      key: queryFilterSequence,
      column: queryFilterCurrItemName,
      filter: queryFilterCodeKey,
      input: queryFilterCodeInput,
    };
    queryFilterToStore.push(queryFilterOption);
    this.setState({ queryFilterToStore: queryFilterToStore });
    this.props.setQueryFilters(queryFilterToStore);

    let modifiedBtnText = "";
    //TODO: Code API
    if (queryFilterCodeKey === "EQUALS") {
      modifiedBtnText = queryFilterCurrItemName + " = " + queryFilterCodeInput;
    } else if (queryFilterCodeKey === "NOT_EQUAL") {
      modifiedBtnText = queryFilterCurrItemName + " <> " + queryFilterCodeInput;
    } else if (queryFilterCodeKey === "GREATER_THAN") {
      modifiedBtnText = queryFilterCurrItemName + " > " + queryFilterCodeInput;
    } else if (queryFilterCodeKey === "LESS_THAN") {
      modifiedBtnText = queryFilterCurrItemName + " < " + queryFilterCodeInput;
    } else if (queryFilterCodeKey === "GREATER_THAN_EQUAL") {
      modifiedBtnText = queryFilterCurrItemName + " >= " + queryFilterCodeInput;
    } else if (queryFilterCodeKey === "LESS_THAN_EQUAL") {
      modifiedBtnText = queryFilterCurrItemName + " <= " + queryFilterCodeInput;
    } else if (queryFilterCodeKey === "IN") {
      modifiedBtnText =
        queryFilterCurrItemName + " in ('" + queryFilterCodeInput + "')";
    } else if (queryFilterCodeKey === "NOT_IN") {
      modifiedBtnText =
        queryFilterCurrItemName + " not in ('" + queryFilterCodeInput + "')";
    } else if (queryFilterCodeKey === "LIKE") {
      modifiedBtnText =
        queryFilterCurrItemName + " like " + queryFilterCodeInput;
    } else if (queryFilterCodeKey === "IS_NOT_NULL") {
      modifiedBtnText =
        queryFilterCurrItemName + " is not null " + queryFilterCodeInput;
    } else if (queryFilterCodeKey === "IS_NULL") {
      modifiedBtnText =
        queryFilterCurrItemName + " is null " + queryFilterCodeInput;
    }

    document.getElementById("filter-" + queryFilterCurrItemName).value =
      modifiedBtnText;
    document.getElementById("filter-" + queryFilterCurrItemName).innerText =
      modifiedBtnText;

    this.setState({ filterModalShow: false });
  }

  /**
   * Query.Filters
   * @param {*} inputValue
   * @returns
   */
  filterQueryFilterOptions = (inputValue) => {
    return this.state.queryFilterOptions.filter((i) =>
      // i.label.toLowerCase().includes(inputValue.toLowerCase())
      i.value.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  promiseQueryFilterOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterQueryFilterOptions(inputValue));
      }, 2000);
    });
  handleInputChangeQueryFilterOptions = (selectedOption) => {
    console.log(selectedOption);
    let queryFilterToStore = this.state.queryFilterToStore;
    let modifiedQueryFilterList = [];

    if (queryFilterToStore.length > 0) {
      if (selectedOption.length > 0) {
        console.log("Query.Filters Not Null");
        selectedOption.forEach((el, key) => {
          let columnName = el["value"].toLowerCase();

          let findArray = queryFilterToStore.filter((element) =>
            element["column"].toLowerCase().match(columnName)
          );

          if (findArray.length > 0) {
            modifiedQueryFilterList.push(findArray[0]);
          }
        });

        this.setState({ queryFilterToStore: modifiedQueryFilterList });
        this.props.setQueryFilters(modifiedQueryFilterList);

        this.setState({ defaultQueryFilters: selectedOption });
      } else {
        console.log("Query.Filters IS NULL");
        modifiedQueryFilterList = [];
        this.setState({ queryFilterToStore: modifiedQueryFilterList });
        this.props.setQueryFilters(modifiedQueryFilterList);

        this.setState({ defaultQueryFilters: selectedOption });
      }
    } else {
      console.log("Query.Filters Not Null");
        selectedOption.forEach((el, key) => {
          let columnName = el["value"].toLowerCase();

          let findArray = queryFilterToStore.filter((element) =>
            element["column"].toLowerCase().match(columnName)
          );

          if (findArray.length > 0) {
            modifiedQueryFilterList.push(findArray[0]);
          }
        });

        this.setState({ queryFilterToStore: modifiedQueryFilterList });
        this.props.setQueryFilters(modifiedQueryFilterList);

        this.setState({ defaultQueryFilters: selectedOption });
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col" style={{ paddingBottom: 10 }}>
          <div style={{ paddingLeft: 20 }}>Filters</div>
          <div style={{ paddingLeft: 20 }}>
            <AsyncSelect
              value={this.state.defaultQueryFilters}
              isMulti
              cacheOptions
              defaultOptions
              placeholder={"choose one or more"}
              loadOptions={this.promiseQueryFilterOptions}
              onChange={this.handleInputChangeQueryFilterOptions}
            />
          </div>
        </div>
        {/* <!-- Modal: Query Filters Detail --> */}
        <Modal
          size="sm"
          show={this.state.filterModalShow}
          onHide={this.filterModalClose}
          style={{ left: "-10%", top: "60%" }}
        >
          <Modal.Body>
            <div className="container">
              <div className="mb-3 row">
                <div className="col-sm-12">
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.queryFilterCurrItem}
                    disabled
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col-sm-12">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="queryFilterCodeItem"
                    value={this.state.fields["queryFilterCodeItem"]}
                    onChange={this.handleInputChange}
                    ref={this.queryFilterCodeKey}
                  >
                    {this.state.queryFilterCode.map((e, key) => {
                      return (
                        <option key={key} value={e.value}>
                          {e.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col-sm-12">
                  <input
                    className="form-control"
                    type="text"
                    name="queryFilterCompareTo"
                    value={this.state.queryFilterCompareTo}
                    onChange={this.handleInputChange}
                    ref={this.queryFilterCodeInput}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.filterModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.filterModalSave}>
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
  queryFilters: state.makeChartPanelLeft.queryFilters,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setQueryFilters: (data) => dispatch(action.setQueryFilters(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryFilters);
