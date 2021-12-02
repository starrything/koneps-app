import React from "react";
import { connect } from "react-redux";
import CanvasOfFilterBoxItem from "./CanvasOfFilterBoxItem";
import * as actions from "~/modules/chart/actionOfFilterBox";

class CanvasOfFilterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      filterBoxList: [],
    };

    this.runFilterBox = this.runFilterBox.bind(this);
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
      chartTypeList.filter((chart) => chart === "filterBox")
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
        let update_big_number_width =
          makeChartComponent - rightSubtractionWidth;
        let update_big_number_height =
          window.innerHeight - rightSubtractionHeight;

        this.setState({
          filterBoxWidth: update_big_number_width,
          filterBoxHeight: update_big_number_height,
        });
      }
    } else if (canvasMode === "view") {
      this.setState({
        filterBoxHeight: "100%",
      });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filterBoxData !== this.props.filterBoxData) {
      //query result
      let filterBoxData = this.props.filterBoxData;
      if (filterBoxData.length > 0) {
        //
        let filterBoxList = [];
        filterBoxData.forEach((element) => {
          let label = element["label"];
          let column = element["column"];
          let filterData = element["filterData"];
          filterBoxList.push(
            <CanvasOfFilterBoxItem
              key={column}
              filterBoxColumn={column}
              filterBoxLabel={label}
              filterBoxData={filterData}
            />
          );
        });
        this.setState({ filterBoxList: filterBoxList });
      }
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  runFilterBox() {
    // 1. FilterBox의 dataset과 같은 차트 탐색
    // 2. set selected options by filterBox -> redux
    // 3. 각 차트에서 필요한 값 세팅 -> 각 캔버스 쿼리 파일 수정
    // 4. props.state.actionOfDashboard.currGridItemList -> remove and add
    // 5. reload DashboardChartView

    // let gridItems = this.props.currGridItemList;
    // 1. FilterBox의 dataset과 같은 차트 탐색
    // let chartListByDataset = gridItems
    //   .filter((item) => item.type === "chart")
    //   .filter((item) => item.dataset === this.props.filterBoxDataset)
    //   .filter((item) => item.chartType !== "filterBox");
    // console.log(chartListByDataset);

    // 2. set selected options by filterBox -> redux : <CanvasOfFilterBoxItem />

    // 4. props.state.actionOfDashboard.currGridItemList -> remove and add : refresh -> 5. reload DashboardChartView
    // chartListByDataset.forEach(el => {
    //   //remove
    //   this.props.setGridItemList(_.reject(gridItems, { index: el.index}));
    //   gridItems = _.reject(gridItems, { index: el.index});
    //   //add
    //   this.props.setGridItemList([...gridItems, el]);
    //   gridItems = [...gridItems, el];
    // });

    // This.is.real
    this.props.setFilterBoxApply(true);
    this.props.setClickCount(this.props.clickCount +1);
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
      <div className="filter-box-Panel" style={containerStyle}>
        {this.state.filterBoxList.map((e, key) => {
          return e;
        })}
        <button
          type="button"
          className="btn btn-sm btn-outline-success"
          onClick={this.runFilterBox}
        >
          APPLY
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // TODO: state of store => props by the corresponding component
  gnbView: state.actionOfGlobal.gnbView,
  filterBoxData: state.actionOfFilterBox.filterBoxData,
  filterBoxDataset: state.actionOfFilterBox.filterBoxDataset,
  clickCount: state.actionOfFilterBox.clickCount,
  currGridItemList: state.actionOfDashboard.currGridItemList,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterBoxApply: (data) => dispatch(actions.setFilterBoxApply(data)),
  setClickCount: (data) => dispatch(actions.setClickCount(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasOfFilterBox);
