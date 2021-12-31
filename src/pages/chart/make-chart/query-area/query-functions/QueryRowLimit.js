import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";

import AsyncSelect from "react-select/async";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isNotEmpty } from "~/utils/Valid";

class QueryRowLimit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      rowLimitOptions: [],
      defaultRowLimit: [],
    };

    // get Code List by API
    this.getQueryRowLimitCode = this.getQueryRowLimitCode.bind(this);

    // <!- Query Row Limit ->
    this.filterRowLimitOptions = this.filterRowLimitOptions.bind(this);
    this.promiseRowLimitOptions = this.promiseRowLimitOptions.bind(this);
    this.handleInputChangeRowLimitOptions =
      this.handleInputChangeRowLimitOptions.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.getQueryRowLimitCode();

    if (
      isNotEmpty(this.props.chartId) &&
      isNotEmpty(this.props.queryRowLimit)
    ) {
      const savedQueryRowLimit = this.props.queryRowLimit;
      let filteredList = [];
      filteredList.push({
        value: savedQueryRowLimit,
        label: savedQueryRowLimit,
      });
      this.setState({ defaultRowLimit: filteredList });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      this.setState({ queryColumnOptions: this.props.queryColumnOptions });

      if (
        isNotEmpty(this.props.chartId) &&
        isNotEmpty(this.props.queryRowLimit)
      ) {
        const savedQueryRowLimit = this.props.queryRowLimit;
        let filteredList = [];
        filteredList.push({
          value: savedQueryRowLimit,
          label: savedQueryRowLimit,
        });
        this.setState({ defaultRowLimit: filteredList });
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {}

  getQueryRowLimitCode() {
    let self = this;

    AxiosConfig.get("/api/code", {
      params: {
        code: "ROW_LIMIT",
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
        self.setState({ rowLimitOptions: codeOptions });
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  /**
   * Query.RowLimit
   * @param {*} inputValue
   * @returns
   */
  filterRowLimitOptions = (inputValue) => {
    return this.state.rowLimitOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  promiseRowLimitOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterRowLimitOptions(inputValue));
      }, 2000);
    });
  handleInputChangeRowLimitOptions = (selectedOption) => {
    if (selectedOption["value"]) {
      this.setState({ defaultRowLimit: selectedOption });
      this.props.setQueryRowLimit(selectedOption["value"]);
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col" style={{ paddingBottom: 10 }}>
          <div style={{ paddingLeft: 20 }}>Row Limit</div>
          <div style={{ paddingLeft: 20 }}>
            <AsyncSelect
              value={this.state.defaultRowLimit}
              cacheOptions
              defaultOptions
              loadOptions={this.promiseRowLimitOptions}
              onChange={this.handleInputChangeRowLimitOptions}
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
  queryRowLimit: state.makeChartPanelLeft.queryRowLimit,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setQueryRowLimit: (data) => dispatch(action.setQueryRowLimit(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryRowLimit);
