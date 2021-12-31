import React from "react";
import { connect } from "react-redux";

class CanvasOfBigNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      bigNumberData: [],
      bigNumber: [],
      index: this.props.index,
    };
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    let canvasMode = this.props.canvasMode;
    console.log("Canvas mode: " + canvasMode);
    let chartTypeList = this.props.currGridItemList
      .filter((item) => item.type === "chart")
      .map((item) => item.chartType);

    if (
      canvasMode === "edit" &&
      chartTypeList.filter((chart) => chart === "bigNumber")
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
        this.setState({ bigNumbertWidth: 450, bigNumberHeight: 102 });
      } else {
        let update_big_number_width =
          makeChartComponent - rightSubtractionWidth;
        let update_big_number_height =
          window.innerHeight - rightSubtractionHeight;

        this.setState({
          bigNumbertWidth: update_big_number_width,
          bigNumberHeight: update_big_number_height,
        });
      }
    } else if (canvasMode === "view") {
      let bigNumbertWidth =
        document.getElementById("dashboard-chart-view_" + this.props.index)
          .clientWidth - 20;
      let bigNumberHeight =
        document.getElementById("dashboard-chart-view_" + this.props.index)
          .clientHeight - 34;
      this.setState({
        bigNumbertWidth: bigNumbertWidth,
        bigNumberHeight: bigNumberHeight,
      });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidUpdate(prevProps) {
    // if (this.props.canvasMode === "view") {
    if (this.props.bigNumber.length > 0) {
      if (prevProps.bigNumber !== this.props.bigNumber) {
        console.log(
          "CavasOfBigNumber.js -- componentDidUpdate() : chart data ++++++++++++++++++++++++++++++++++"
        );
        // set Data
        const bigNumber = this.props.bigNumber;
        console.log(bigNumber);
        console.log(
          "index: " + this.state.index + ", typeOf: " + typeof this.state.index
        );
        // let thisBarChartData = barChartData.filter(
        //   map => Array.from(map.keys()).filter(key => key === this.state.index)
        // );
        let thisBigNumber = [];
        bigNumber.forEach((map) => {
          console.log(map);
          console.log(map.keys().next().value);
          if (Number(map.keys().next().value) === Number(this.state.index)) {
            console.log(this.state.index);
            thisBigNumber = [map];
          }
          console.log(thisBigNumber);
        });
        if (thisBigNumber.length > 0) {
          console.log(thisBigNumber[0].get(this.state.index));
          this.setState({
            bigNumber: thisBigNumber[0].get(this.state.index),
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
    if (this.props.canvasMode === "view") {
      containerStyle = {
        height: "90%",
        padding: "0px",
      };
    } else {
      containerStyle = {
        padding: "10px",
      };
    }
    return (
      <div className="big-number-Panel" style={containerStyle}>
        <div
          className="big-number-container"
          style={{
            height: this.state.bigNumberHeight,
            verticalAlign: "middle",
            display: "table-cell",
          }}
        >
          <div
            className="big-number head-line"
            style={{
              width: this.state.bigNumbertWidth,
              height: this.state.bigNumberHeight * 0.4,
              fontSize: this.state.bigNumberHeight * 0.3,
              verticalAlign: "middle",
              display: "table-cell",
            }}
          >
            {this.state.bigNumber}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // TODO: state of store => props by the corresponding component
  gnbView: state.actionOfGlobal.gnbView,
  currGridItemList: state.actionOfDashboard.currGridItemList,
  optionsNumberFormat: state.makeChartPanelLeft.optionsNumberFormat,
  bigNumberData: state.actionOfBigNumber.bigNumberData,
  bigNumber: state.actionOfBigNumber.bigNumber,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasOfBigNumber);
