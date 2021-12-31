import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";

import AsyncSelect from "react-select/async";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isEmpty, isNotEmpty } from "~/utils/Valid";

class QueryMaxBubbleSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      maxBubbleSizeOptions: [],
      defaultMaxBubbleSize: [],
    };

    // get Code List by API
    this.getQueryMaxBubbleSizeCode = this.getQueryMaxBubbleSizeCode.bind(this);

    // <!- Query Row Limit ->
    this.filterMaxBubbleSizeOptions =
      this.filterMaxBubbleSizeOptions.bind(this);
    this.promiseMaxBubbleSizeOptions =
      this.promiseMaxBubbleSizeOptions.bind(this);
    this.handleInputChangeMaxBubbleSizeOptions =
      this.handleInputChangeMaxBubbleSizeOptions.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.getQueryMaxBubbleSizeCode();

    if (
      isNotEmpty(this.props.chartId) &&
      isNotEmpty(this.props.queryMaxBubbleSize)
    ) {
      const savedQueryMaxBubbleSize = this.props.queryMaxBubbleSize; // String type : ""
      let filteredList = [];
      filteredList.push({
        value: savedQueryMaxBubbleSize,
        label: savedQueryMaxBubbleSize,
      });
      this.setState({ defaultMaxBubbleSize: filteredList });
    } else {
      this.props.setQueryMaxBubbleSize("25");
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      // Update state
      if (
        isNotEmpty(this.props.chartId) &&
        isNotEmpty(this.props.queryMaxBubbleSize)
      ) {
        const savedQueryMaxBubbleSize = this.props.queryMaxBubbleSize; // String type : ""
        let filteredList = [];
        filteredList.push({
          value: savedQueryMaxBubbleSize,
          label: savedQueryMaxBubbleSize,
        });
        this.setState({ defaultMaxBubbleSize: filteredList });
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {}

  getQueryMaxBubbleSizeCode() {
    let self = this;

    AxiosConfig.get("/api/code", {
      params: {
        code: "MAX_BUBBLE_SIZE",
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

        self.setState({ maxBubbleSizeOptions: codeOptions });
        console.log("MaxBubbleSize : " + self.props.chartId);
        if (isEmpty(self.props.chartId)) {
          self.props.setQueryMaxBubbleSize("25");
        }
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  filterMaxBubbleSizeOptions = (inputValue) => {
    return this.state.maxBubbleSizeOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  promiseMaxBubbleSizeOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterMaxBubbleSizeOptions(inputValue));
      }, 2000);
    });
  handleInputChangeMaxBubbleSizeOptions = (selectedOption) => {
    if (isNotEmpty(selectedOption)) {
      if (selectedOption["value"]) {
        this.props.setQueryMaxBubbleSize(selectedOption["value"]);
        this.setState({ defaultMaxBubbleSize: selectedOption });
      }
    } else {
      this.props.setQueryMaxBubbleSize("");
      this.setState({ defaultMaxBubbleSize: selectedOption });
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col" style={{ paddingBottom: 10 }}>
          <div style={{ paddingLeft: 20 }}>Max Bubble Size</div>
          <div style={{ paddingLeft: 20 }}>
            <AsyncSelect
              value={this.state.defaultMaxBubbleSize}
              cacheOptions
              defaultOptions
              //defaultValue={{ label: 25, value: 25 }}
              isClearable="true"
              loadOptions={this.promiseMaxBubbleSizeOptions}
              onChange={this.handleInputChangeMaxBubbleSizeOptions}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  chartId: state.datasetAndChartType.chartId,
  chartType: state.datasetAndChartType.chartType,
  datasetSpecs: state.datasetAndChartType.datasetSpecs,
  queryMaxBubbleSize: state.makeChartPanelLeft.queryMaxBubbleSize,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setQueryMaxBubbleSize: (data) => dispatch(action.setQueryMaxBubbleSize(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryMaxBubbleSize);
