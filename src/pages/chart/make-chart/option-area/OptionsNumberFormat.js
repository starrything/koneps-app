import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import AxiosConfig from "~/utils/AxiosConfig";
import AsyncSelect from "react-select/async";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { format } from "d3-format";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as actionOfLeftControlPanel from "~/modules/chart/makeChartPanelLeft";
import * as action from "~/modules/chart/actionOfBigNumber";
import { isNotEmpty } from "~/utils/Valid";

class OptionsNumberFormat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      numberFormatOptions: [],
      defaultNumberFormat: [],
    };

    this.displayIcon = this.displayIcon.bind(this);
    this.hideIcon = this.hideIcon.bind(this);

    this.getNumberFormatCode = this.getNumberFormatCode.bind(this);

    // Options.NumberFormat
    this.filterNumberFormatOptions = this.filterNumberFormatOptions.bind(this);
    this.promiseNumberFormatOptions =
      this.promiseNumberFormatOptions.bind(this);
    this.handleInputChangeNumberFormat =
      this.handleInputChangeNumberFormat.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.getNumberFormatCode();

    let chartType = this.props.chartType;
    if (chartType === "bigNumber") {
      this.setState({ isVisible: true });
    } else {
      this.setState({ isVisible: false });
    }

    if (
      isNotEmpty(this.props.chartId) &&
      isNotEmpty(this.props.optionsNumberFormat)
    ) {
      const savedNumberFormat = this.props.optionsNumberFormat; // String type : ""
      let filteredList = [];
      filteredList.push({
        value: savedNumberFormat,
        label: savedNumberFormat,
      });
      console.log("OptionsNumberFormat - componentDidMount()");
      console.log(savedNumberFormat);
      this.setState({ defaultNumberFormat: filteredList });
      //this.convertNumberFormat(savedNumberFormat);
    }
  }

  convertNumberFormat(numberFormat) {
    console.log("this.convertNumberFormat()");

    // let bigNumberData = this.props.bigNumberData.value;
    let bigNumberData = this.props.bigNumberData;
    //let bigNumberData = "12345.6789";
    if (bigNumberData.length > 0) {
      console.log(bigNumberData[0].get(0));
      bigNumberData = bigNumberData[0].get(0).value;
    }

    let bigNumber = "";
    if (numberFormat === "original") {
      //
      bigNumber = bigNumberData;
      //this.props.setBigNumber(bigNumber);
    } else if (numberFormat === "decimal") {
      const f = format(",d");
      bigNumber = f(bigNumberData);
      //this.props.setBigNumber(bigNumber);
    } else if (numberFormat === "1string") {
      const f = format(".1s");
      bigNumber = f(bigNumberData);
      //this.props.setBigNumber(bigNumber);
    } else if (numberFormat === "3string") {
      const f = format(".3s");
      bigNumber = f(bigNumberData);
      //this.props.setBigNumber(bigNumber);
    } else if (numberFormat === "1percent") {
      const f = format(",.1%");
      bigNumber = f(bigNumberData);
      //this.props.setBigNumber(bigNumber);
    } else if (numberFormat === "3percent") {
      const f = format(".3%");
      bigNumber = f(bigNumberData);
      //this.props.setBigNumber(bigNumber);
    } else if (numberFormat === "4round") {
      const f = format(".4r");
      bigNumber = f(bigNumberData);
      //this.props.setBigNumber(bigNumber);
    } else if (numberFormat === "3float") {
      const f = format(",.3f");
      bigNumber = f(bigNumberData);
      //this.props.setBigNumber(bigNumber);
    } else if (numberFormat === "currency_won") {
      const f = format(",d");
      bigNumber = "₩" + f(bigNumberData);
      //this.props.setBigNumber(bigNumber);
    }

    let canvasMode = this.props.canvasMode;
    let bigNumberMap = new Map();
    let thisBigNumber = [];
    if (canvasMode === "view") {
      bigNumberMap.set(this.props.index, bigNumber);
      thisBigNumber = [...this.props.bigNumber, bigNumberMap];
    } else {
      bigNumberMap.set(0, bigNumber);
      thisBigNumber = [bigNumberMap];
    }    
    this.props.setBigNumber(thisBigNumber);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      // Update state
      let chartType = this.props.chartType;
      if (chartType === "bigNumber") {
        this.setState({ isVisible: true });
      } else {
        this.setState({ isVisible: false });
      }
      console.log("OptionsNumberFormat - componentDidUpdate()");
      console.log(this.props.optionsNumberFormat);
      if (
        isNotEmpty(this.props.chartId) &&
        isNotEmpty(this.props.optionsNumberFormat)
      ) {
        const savedNumberFormat = this.props.optionsNumberFormat; // String type : ""
        let filteredList = [];
        filteredList.push({
          value: savedNumberFormat,
          label: savedNumberFormat,
        });
        this.setState({ defaultNumberFormat: filteredList });
        //this.convertNumberFormat(savedNumberFormat);
      }
    }

    if (prevProps.chartType !== this.props.chartType) {
      let chartType = this.props.chartType;
      if (chartType === "bigNumber") {
        this.setState({ isVisible: true });
      } else {
        this.setState({ isVisible: false });
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {}

  getNumberFormatCode() {
    let self = this;

    AxiosConfig.get("/api/code", {
      params: {
        code: "NUMBER_FORMAT",
      },
    })
      .then(function (response) {
        // success
        //self.setCodeList("time-grain", response.data);
        let codeOptions = [];
        response.data.forEach((element) => {
          codeOptions.push({
            value: element["code"],
            label: element["value"].toLowerCase(),
          });
          self.setState({ numberFormatOptions: codeOptions });
        });
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  //Time.TimeGrain
  filterNumberFormatOptions = (inputValue) => {
    return this.state.numberFormatOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  promiseNumberFormatOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterNumberFormatOptions(inputValue));
      }, 2000);
    });
  handleInputChangeNumberFormat = (selectedOption) => {
    if (isNotEmpty(selectedOption)) {
      let numberFormat = selectedOption["value"];

      this.convertNumberFormat(numberFormat);

      this.props.setOptionsNumberFormat(numberFormat);
      this.setState({ defaultNumberFormat: selectedOption });
    }
  };

  displayIcon() {
    this.setState({ isVisibleIcon: true });
  }
  hideIcon() {
    this.setState({ isVisibleIcon: false });
  }

  render() {
    const renderInfoNumberFormat = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        D3 format syntax: https:github.com/d3/d3-format
      </Tooltip>
    );

    return (
      <div
        className="col"
        style={{
          paddingBottom: 10,
          display: this.state.isVisible ? "block" : "none",
        }}
      >
        <div className="row" style={{ paddingLeft: 20 }}>
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onMouseOver={this.displayIcon}
            onMouseOut={this.hideIcon}
          >
            <div align="left" style={{ float: "left" }}>
              Number Format
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
                overlay={renderInfoNumberFormat}
              >
                <i className="bi bi-info-circle"></i>
              </OverlayTrigger>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingLeft: 20 }}>
          <AsyncSelect
            value={this.state.defaultNumberFormat}
            cacheOptions
            defaultOptions
            defaultValue={{ label: "Original value", value: "original" }}
            loadOptions={this.promiseNumberFormatOptions}
            onChange={this.handleInputChangeNumberFormat}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  canvasMode: state.datasetAndChartType.canvasMode,
  chartId: state.datasetAndChartType.chartId,
  chartType: state.datasetAndChartType.chartType,
  datasetSpecs: state.datasetAndChartType.datasetSpecs,
  bigNumberData: state.actionOfBigNumber.bigNumberData,
  bigNumber: state.actionOfBigNumber.bigNumber,
  optionsNumberFormat: state.makeChartPanelLeft.optionsNumberFormat,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setBigNumber: (data) => dispatch(action.setBigNumber(data)),
  setOptionsNumberFormat: (data) =>
    dispatch(actionOfLeftControlPanel.setOptionsNumberFormat(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsNumberFormat);
