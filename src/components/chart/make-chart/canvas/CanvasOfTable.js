import React from "react";
import { AgGridReact } from "ag-grid-react";

import { connect } from "react-redux";
import { resetStore } from "~/modules/index";
import * as actionOfTable from "~/modules/chart/actionOfTable";

const gridOptions = {
  // PROPERTIES
  // Objects like myRowData and myColDefs would be created in your application
  pagination: true,
  rowSelection: "single",
  isScrollLag: () => false,
};
const defaultColDef = {
  enableValue: true,
  enableRowGroup: true,
  enablePivot: true,
};

class CanvasOfTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      rowData: [],
      columnDefs: [],
    };

    this.setState({
      rowData: this.props.tableRowData,
      columnDefs: this.props.tableColDefs,
    });
  }

  onGridReady = (params) => {
    // or setState if using components
    this.setState({
      gridApi: params.api,
      columnApi: params.columnApi,
    });

    this.props.setTableGridApi(params.api);
  };

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    let chartTypeList = this.props.currGridItemList
      .filter((item) => item.type === "chart")
      .map((item) => item.chartType);

    if (
      this.props.canvasMode === "edit" &&
      chartTypeList.filter((chart) => chart === "table")
    ) {
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
      // Right Area: Total Height
      let rightSubtractionHeight =
        gnbNavbarHeight + rightPanelHeadingHeight + paddingTopHeight * 4;
      // console.log(rightSubtractionHeight);
      let update_table_height = window.innerHeight - rightSubtractionHeight;

      this.setState({
        tableHeight: update_table_height,
      });
    } else if (this.props.canvasMode === "view") {
      this.setState({
        tableHeight: "100%",
      });
    }
  }

  componentDidMount() {
    // this.props.setQueryOfChart(this.makeChartByTable);
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
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
    }
    return (
      <div style={{ height: "100%" }}>
        <div className="container-fluid" style={containerStyle}>
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: this.state.tableHeight }}
          >
            <AgGridReact
              onGridReady={this.onGridReady}
              rowData={this.props.tableRowData}
              columnDefs={this.props.tableColumnDefs}
              gridOptions={gridOptions}
              //defaultColDef={defaultColDef}
              sideBar={true}
            />
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
  datasetId: state.datasetAndChartType.datasetId,
  chartType: state.datasetAndChartType.chartType,
  chartTitle: state.makeChartPanelLeft.chartTitle,
  timeColumn: state.makeChartPanelLeft.timeColumn,
  timeGrain: state.makeChartPanelLeft.timeGrain,
  timeRange: state.makeChartPanelLeft.timeRange,
  queryColumns: state.makeChartPanelLeft.queryColumns,
  queryOrdering: state.makeChartPanelLeft.queryOrdering,
  queryRowLimit: state.makeChartPanelLeft.queryRowLimit,
  queryFilters: state.makeChartPanelLeft.queryFilters,
  tableRowData: state.actionOfTable.tableRowData,
  tableColDefs: state.actionOfTable.tableColDefs,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
  setTableGridApi: (data) => dispatch(actionOfTable.setTableGridApi(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasOfTable);
