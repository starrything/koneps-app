import React from "react";
import Plot from "react-plotly.js";

import { connect } from "react-redux";

class CanvasOfBubbleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      bubbleChartData: [],
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
      chartTypeList.filter((chart) => chart === "bubbleChart")
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
        this.setState({ bubbleChartWdith: 450, bubbleChartHeight: 102 });
      } else {
        let update_bb_chart_width = makeChartComponent - rightSubtractionWidth;
        let update_bb_chart_height =
          window.innerHeight - rightSubtractionHeight;

        this.setState({
          bubbleChartWidth: update_bb_chart_width,
          bubbleChartHeight: update_bb_chart_height,
        });
      }
    } else if (canvasMode === "view") {
      //
      this.setState({
        bubbleChartHeight: "100%",
      });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidUpdate(prevProps) {
    if (this.props.bubbleChartData.length > 0) {
      if (prevProps.bubbleChartData !== this.props.bubbleChartData) {
        console.log(
          "CavasOfBubbleChart.js -- componentDidUpdate() : chart data ++++++++++++++++++++++++++++++++++"
        );
        // set Data
        const bubbleChartData = this.props.bubbleChartData;
        console.log(bubbleChartData);
        console.log(
          "index: " + this.state.index + ", typeOf: " + typeof this.state.index
        );
        // let thisBubbleChartData = bubbleChartData.filter(
        //   map => Array.from(map.keys()).filter(key => key === this.state.index)
        // );
        let thisBubbleChartData = [];
        bubbleChartData.forEach((map) => {
          console.log(map);
          console.log(map.keys().next().value);
          if (Number(map.keys().next().value) === Number(this.state.index)) {
            console.log(this.state.index);
            thisBubbleChartData = [map];
          }
          console.log(thisBubbleChartData);
        });
        if (thisBubbleChartData.length > 0) {
          console.log(thisBubbleChartData[0].get(this.state.index));
          this.setState({
            bubbleChartData: thisBubbleChartData[0].get(this.state.index),
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
    let containerStyle = {};
    let bbChartLegend = {};
    if (this.props.canvasMode === "view") {
      containerStyle = {
        height: "90%",
        padding: "0px",
      };

      // let graphHeight = document.getElementById(
      //   "chart-panel_" + this.props.index
      // ).clientHeight;

      bbChartLegend = {
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
    }
    let plot = (
      <Plot
        style={{
          width: this.state.bubbleChartWidth,
          height: this.state.bubbleChartHeight,
        }}
        data={this.state.bubbleChartData}
        layout={bbChartLegend}
        config={{ responsive: true }}
      />
    );
    return (
      <div
        className="bubble-chart-panel"
        style={containerStyle}
        id={"chart-panel_" + this.props.index}
      >
        {plot}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // TODO: state of store => props by the corresponding component
  gnbView: state.actionOfGlobal.gnbView,
  currGridItemList: state.actionOfDashboard.currGridItemList,
  bubbleChartData: state.actionOfBubbleChart.bubbleChartData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasOfBubbleChart);
