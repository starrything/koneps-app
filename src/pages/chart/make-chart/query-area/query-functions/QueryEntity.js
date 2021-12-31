import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import AsyncSelect from "react-select/async";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isNotEmpty } from "~/utils/Valid";

class QueryEntity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      entityOptions: [],
      defaultEntity: [],
    };

    this.displayIcon = this.displayIcon.bind(this);
    this.hideIcon = this.hideIcon.bind(this);

    this.setEntityOptions = this.setEntityOptions.bind(this);
    // Query.Entity
    this.filterEntityOptions = this.filterEntityOptions.bind(this);
    this.promiseEntityOptions = this.promiseEntityOptions.bind(this);
    this.handleInputChangeEntity = this.handleInputChangeEntity.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    let datasetSpecs = this.props.datasetSpecs;
    this.setEntityOptions(datasetSpecs);

    if (isNotEmpty(this.props.chartId) && isNotEmpty(this.props.queryEntity)) {
      const savedQueryEntity = this.props.queryEntity; // String type : ""
      let filteredList = [];
      filteredList.push({
        value: savedQueryEntity,
        label: savedQueryEntity,
      });
      this.setState({ defaultEntity: filteredList });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      let datasetSpecs = this.props.datasetSpecs;
      this.setEntityOptions(datasetSpecs);

      if (
        isNotEmpty(this.props.chartId) &&
        isNotEmpty(this.props.queryEntity)
      ) {
        const savedQueryEntity = this.props.queryEntity; // String type : ""
        let filteredList = [];
        filteredList.push({
          value: savedQueryEntity,
          label: savedQueryEntity,
        });
        this.setState({ defaultEntity: filteredList });
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {}

  setEntityOptions(data) {
    let entityOptions = [];
    data.forEach((element) => {
      entityOptions.push({
        value: element["columnName"],
        label: element["columnName"].toLowerCase(),
      });
      this.setState({ entityOptions: entityOptions });
    });
  }

  /**
   * Query.Entity
   * @param {*} inputValue
   * @returns
   */
  filterEntityOptions = (inputValue) => {
    return this.state.entityOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  promiseEntityOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterEntityOptions(inputValue));
      }, 2000);
    });
  handleInputChangeEntity = (selectedOption) => {
    if (selectedOption["value"]) {
      this.props.setQueryEntity(selectedOption["value"]);
      this.setState({ defaultEntity: selectedOption });
    }
  };

  displayIcon() {
    this.setState({ isVisibleIcon: true });
  }
  hideIcon() {
    this.setState({ isVisibleIcon: false });
  }

  render() {
    const renderInfoQueryEntity = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        차트에 시각화할 요소를 정의합니다.
      </Tooltip>
    );

    return (
      <div className="col-6" style={{ paddingBottom: 10 }}>
        <div className="row" style={{ paddingLeft: 20 }}>
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onMouseOver={this.displayIcon}
            onMouseOut={this.hideIcon}
          >
            <div align="left" style={{ float: "left" }}>
              Entity
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
                overlay={renderInfoQueryEntity}
              >
                <i className="bi bi-info-circle"></i>
              </OverlayTrigger>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingLeft: 20 }}>
          <AsyncSelect
            value={this.state.defaultEntity}
            cacheOptions
            defaultOptions
            loadOptions={this.promiseEntityOptions}
            onChange={this.handleInputChangeEntity}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  chartId: state.datasetAndChartType.chartId,
  chartType: state.datasetAndChartType.chartType,
  datasetSpecs: state.datasetAndChartType.datasetSpecs,
  queryEntity: state.makeChartPanelLeft.queryEntity,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setQueryEntity: (data) => dispatch(action.setQueryEntity(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryEntity);
