import React from "react";
import Plot from "react-plotly.js";

import { connect } from "react-redux";

class CanvasOfBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      barChartData: [],
      index: this.props.index,
    };
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    let canvasMode = this.props.canvasMode;
    let chartTypeList = this.props.currGridItemList
      .filter((item) => item.type === "chart")
      .map((item) => item.chartType);

    if (
      canvasMode === "edit" &&
      chartTypeList.filter((chart) => chart === "barChart")
    ) {
      // calculate for width
      let makeChartComponent =
        document.getElementById("makeChartComponent").clientWidth;
      let makeChartLeftPanel =
        document.getElementById("makeChartLeftPanel").clientWidth;

      // calculate for height
      let gnbNavbarHeight = this.props.gnbView === "show" ? 56 : 0; //document.getElementById("gnbNavbarComponent").clientHeight
      let rightPanelHeadingHeight = document.getElementById(
        "right-panel-heading"
      ).clientHeight;
      let paddingTopHeight = 10;

      /**
       * Screen layout :
       * # 공통 레이아웃
       * 1. 글로벌 내비게이션 바 (Top Menu) - gnbNavbarComponent : 56
       * 2. MakeChart 컴포넌트 패딩 : 10
       * # 오른쪽 영역
       * 3. panel-heading :
       */

      let rightSubtractionWidth = makeChartLeftPanel + paddingTopHeight * 8;
      // Right Area: Total Height
      let rightSubtractionHeight =
        gnbNavbarHeight + rightPanelHeadingHeight + paddingTopHeight * 4;
      // console.log(rightSubtractionHeight);

      if (window.innerWidth < 500) {
        this.setState({ barChartWidth: 450, barChartHeight: 102 });
      } else {
        let update_bar_chart_width = makeChartComponent - rightSubtractionWidth;
        let update_bar_chart_height =
          window.innerHeight - rightSubtractionHeight;

        this.setState({
          barChartWidth: update_bar_chart_width,
          barChartHeight: update_bar_chart_height,
        });
      }
    } else if (canvasMode === "view") {
      //
      this.setState({
        barChartHeight: "100%",
      });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidUpdate(prevProps) {
    // if (this.props.canvasMode === "view") {
    if (this.props.barChartData.length > 0) {
      if (prevProps.barChartData !== this.props.barChartData) {
        console.log(
          "CavasOfBarChart.js -- componentDidUpdate() : chart data ++++++++++++++++++++++++++++++++++"
        );
        // set Data
        const barChartData = this.props.barChartData;
        console.log(barChartData);
        console.log(
          "index: " + this.state.index + ", typeOf: " + typeof this.state.index
        );
        // let thisBarChartData = barChartData.filter(
        //   map => Array.from(map.keys()).filter(key => key === this.state.index)
        // );
        let thisBarChartData = [];
        barChartData.forEach((map) => {
          console.log(map);
          console.log(map.keys().next().value);
          if (Number(map.keys().next().value) === Number(this.state.index)) {
            console.log(this.state.index);
            thisBarChartData = [map];
          }
          console.log(thisBarChartData);
        });
        if (thisBarChartData.length > 0) {
          console.log(thisBarChartData[0].get(this.state.index));
          this.setState({
            barChartData: thisBarChartData[0].get(this.state.index),
          });
        }
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    let index = this.props.index;
    let containerStyle = {};
    let barChartLegend = {};
    if (this.props.canvasMode === "view") {
      containerStyle = {
        height: "90%",
        padding: "0px",
      };

      // let graphHeight = document.getElementById(
      //   "chart-panel_" + this.props.index
      // ).clientHeight;

      barChartLegend = {
        showlegend: true,
        legend: {
          x: 0,
          y: 1.0,
          bgcolor: "rgba(255, 255, 255, 0)",
          bordercolor: "rgba(255, 255, 255, 0)",
          orientation: "h",
        },
        autosize: true,
        //height: graphHeight,
        margin: {
          l: 30,
          r: 10,
          b: 50,
          t: 20,
          pad: 0,
        },
        barmode: "group",
        bargap: 0.15,
        bargroupgap: 0.1,
      };
    } else {
      containerStyle = {
        padding: "10px",
      };

      // set Data
      //this.setState({ barChartData: this.props.barChartData });
    }
    let plot = (
      <Plot
        style={{
          width: this.state.barChartWidth,
          height: this.state.barChartHeight,
        }}
        data={this.state.barChartData}
        layout={barChartLegend}
        config={{ responsive: true }}
      />
    );
    return (
      <div
        className="bar-chart-panel"
        style={containerStyle}
        id={"chart-panel_" + index}
      >
        {plot}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // TODO: state of store => props by the corresponding component
  currGridItemList: state.actionOfDashboard.currGridItemList,
  barChartData: state.actionOfBarChart.barChartData,
  gnbView: state.actionOfGlobal.gnbView,
  chartHistory: state.dashboardChartView.chartHistory,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasOfBarChart);
