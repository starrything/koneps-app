import React from "react";
import Plot from "react-plotly.js";

import { connect } from "react-redux";

class CanvasOfLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      lineChartData: [],
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
      chartTypeList.filter((chart) => chart === "lineChart")
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
        this.setState({ lineChartWdith: 450, lineChartHeight: 102 });
      } else {
        let update_line_chart_width =
          makeChartComponent - rightSubtractionWidth;
        let update_line_chart_height =
          window.innerHeight - rightSubtractionHeight;

        this.setState({
          lineChartWidth: update_line_chart_width,
          lineChartHeight: update_line_chart_height,
        });
      }
    } else if (canvasMode === "view") {
      this.setState({
        lineChartHeight: "100%",
      });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidUpdate(prevProps) {
    //if (this.props.canvasMode === "view") {
    if (this.props.lineChartData.length > 0) {
      if (prevProps.lineChartData !== this.props.lineChartData) {
        console.log(
          "CavasOfLineChart.js -- componentDidUpdate() : lineChart data ++++++++++++++++++++++++++++++++++"
        );
        // set Data
        const lineChartData = this.props.lineChartData;
        console.log(lineChartData);
        console.log(
          "index: " + this.state.index + ", typeOf: " + typeof this.state.index
        );
        // let thisBarChartData = barChartData.filter(
        //   map => Array.from(map.keys()).filter(key => key === this.state.index)
        // );
        let thisLineChartData = [];
        lineChartData.forEach((map) => {
          console.log(map);
          console.log(map.keys().next().value);
          if (Number(map.keys().next().value) === Number(this.state.index)) {
            console.log(this.state.index);
            thisLineChartData = [map];
          }
          console.log(thisLineChartData);
        });
        if (thisLineChartData.length > 0) {
          console.log(thisLineChartData[0].get(this.state.index));
          this.setState({
            lineChartData: thisLineChartData[0].get(this.state.index),
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
    let lineChartLegend = {};
    if (this.props.canvasMode === "view") {
      containerStyle = {
        height: "90%",
        padding: "0px",
      };

      // let graphHeight = document.getElementById(
      //   "chart-panel_" + this.props.index
      // ).clientHeight;

      lineChartLegend = {
        showlegend: true,
        legend: { orientation: "h" },
        autosize: true,
        //height: graphHeight,
        margin: {
          l: 30,
          r: 10,
          b: 10,
          t: 20,
          pad: 0,
        },
      };
    } else {
      containerStyle = {
        padding: "10px",
      };

      // set Data
      //this.setState({ lineChartData: this.props.lineChartData });
    }
    let plot = (
      <Plot
        style={{
          width: this.state.lineChartWidth,
          height: this.state.lineChartHeight,
        }}
        data={this.state.lineChartData}
        layout={lineChartLegend}
        config={{ responsive: true }}
      />
    );
    return (
      <div
        className="line-chart-panel"
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
  lineChartData: state.actionOfLineChart.lineChartData,
  gnbView: state.actionOfGlobal.gnbView,
  chartHistory: state.dashboardChartView.chartHistory,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasOfLineChart);
