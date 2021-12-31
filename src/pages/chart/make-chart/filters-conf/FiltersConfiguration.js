import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as action from "~/modules/chart/makeChartPanelLeft";
import { isEmpty, isNotEmpty } from "~/utils/Valid";

import FiltersListGroupItem from "./FiltersListGroupItem";

class FiltersConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      numFilterBox: 0,
    };

    this.displayIcon = this.displayIcon.bind(this);
    this.hideIcon = this.hideIcon.bind(this);

    this.addListGroupItem = this.addListGroupItem.bind(this);
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    const chartId = this.props.chartId;
    let chartType = this.props.chartType;
    console.log("FiltersConfiguration - componentDidMount()");
    console.log(this.props.filtersConfiguration.length);
    if (chartType === "filterBox") {
      this.setState({ isVisible: true });
      if (isEmpty(chartId)) {
        console.log("this.props.setFiltersConfiguraion()");
        this.props.setFiltersConfiguration([]);
      } else {
        let numFilterBox = this.props.filtersConfiguration.length;
        this.setState({
          numFilterBox: numFilterBox,
        });
        this.props.setFilterBoxNumber(numFilterBox);
      }
    } else {
      this.setState({ isVisible: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecs !== this.props.datasetSpecs) {
      // Update state
      const chartId = this.props.chartId;
      let chartType = this.props.chartType;
      console.log("FiltersConfiguration - componentDidUpdate()");
      console.log(this.props.filtersConfiguration.length);
      if (chartType === "filterBox") {
        this.setState({ isVisible: true });
        if (isEmpty(chartId)) {
          this.props.setFiltersConfiguration([]);
        } else {
          let numFilterBox = this.props.filtersConfiguration.length;
          this.setState({
            numFilterBox: numFilterBox,
          });
          this.props.setFilterBoxNumber(numFilterBox);
        }
      } else {
        this.setState({ isVisible: false });
      }
    }

    if (prevProps.chartType !== this.props.chartType) {
      let chartType = this.props.chartType;
      if (chartType === "filterBox") {
        this.setState({ isVisible: true });
        this.props.setFiltersConfiguration([]);
      } else {
        this.setState({ isVisible: false });
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {}

  addListGroupItem() {
    let numFilterBox = this.props.numFilterBox;
    
    let filterBox = {};
    filterBox = {
      filterBoxKey: numFilterBox,
      filterBoxColumn: "",
      filterBoxLabel: "",
    };
    let filtersConfiguration = this.props.filtersConfiguration;
    filtersConfiguration.push(filterBox);
    this.props.setFiltersConfiguration(filtersConfiguration);

    //
    numFilterBox = numFilterBox + 1;
    this.setState({
      numFilterBox: numFilterBox,
    });
    this.props.setFilterBoxNumber(numFilterBox);
  }

  displayIcon() {
    this.setState({ isVisibleIcon: true });
  }
  hideIcon() {
    this.setState({ isVisibleIcon: false });
  }

  render() {
    const renderInfoFilterConfiguration = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        필터 박스에 대한 구성
      </Tooltip>
    );

    let filtersConfiguration = this.props.filtersConfiguration;
    let listGroupItems = [];
    // for (var i = 0; i < filtersConfiguration.length; i++) {
    //   listGroupItems.push(
    //     <FiltersListGroupItem
    //       key={i}
    //       filterKey={i}
    //       deleteItem={deleteFilterBox}
    //       filterBoxLabel={filtersConfiguration.filterBoxLabel}
    //       filterBoxColumn={filtersConfiguration.filterBoxColumn}
    //     />
    //   );
    // }
    let itemSeq = 0;
    filtersConfiguration.forEach(el => {
      listGroupItems.push(
        <FiltersListGroupItem
          key={itemSeq}
          filterKey={itemSeq}
          deleteItem={deleteFilterBox}
          filterBoxLabel={el.filterBoxLabel}
          filterBoxColumn={el.filterBoxColumn}
        />
      );
      itemSeq++;
    })

    function deleteFilterBox(key) {
      delete listGroupItems[key];
    }

    const emptyText = <p style={{ color: "grey" }}>Empty collection</p>;
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
              Filters
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
                overlay={renderInfoFilterConfiguration}
              >
                <i className="bi bi-info-circle"></i>
              </OverlayTrigger>
            </div>
          </div>
        </div>
        <div style={{ paddingLeft: 20 }}>
          {/* TODO: List Group */}
          <div className="list-group" id="filter-box-group">
            {this.props.numFilterBox === 0 ? emptyText : ""}
            {listGroupItems}
          </div>
          <i
            className="bi bi-plus-square"
            style={{ cursor: "pointer" }}
            onClick={() => this.addListGroupItem()}
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
  setFilterBoxNumber: (data) => dispatch(action.setFilterBoxNumber(data)),
  setFiltersConfiguration: (data) =>
    dispatch(action.setFiltersConfiguration(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersConfiguration);
