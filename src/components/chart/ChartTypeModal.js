import React from "react";

class ChartTypeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
    };

    this.chartTypeModalForm = React.createRef();
    this.closeButtonChartTypeModal = React.createRef();

    this.selectChartType = this.selectChartType.bind(this);
    this.closeModalEvent = this.closeModalEvent.bind(this);
  }

  selectChartType(value, chartType) {
    this.props.changeChartType(value, chartType);

    this.closeButtonChartTypeModal.current.click();
  }

  closeModalEvent() {
    let modalForm = this.chartTypeModalForm;
    modalForm.current.reset();
  }

  componentDidMount() {
    //this.getDatasourceList();
  }

  render() {
    //   images
    const imgTable = "/images/chart/img_table.PNG";
    const imgLine = "/images/chart/img_line.PNG";
    const imgDualLine = "/images/chart/img_dual_line_blur.png";
    const imgBar = "/images/chart/img_bar.PNG";
    const imgPie = "/images/chart/img_pie.PNG";
    const imgBubble = "/images/chart/img_bubble.PNG";
    const imgFilterBox = "/images/chart/img_filter_box.PNG";
    const imgBigNumber = "/images/chart/img_big_number.PNG";
    const imgWordCloud = "/images/chart/img_word_cloud_blur.png";
    return (
      <div
        className="modal fade"
        id="chartTypeModal"
        tabIndex="-1"
        aria-labelledby="chartTypeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title" id="chartTypeModalLabel">
                Select a visualization type
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={this.closeButtonChartTypeModal}
              ></button>
            </div>
            {/* Modal Body */}
            {/* TODO: Chart Type 코드관리 필요 */}
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={imgTable}
                      alt="table"
                      className="img-thumbnail"
                      style={{ cursor: "pointer" }}
                      onClick={() => this.selectChartType("table", "Table")}
                    />
                    Table
                  </div>
                  <div className="col-md-4">
                    <img
                      src={imgLine}
                      alt="line chart"
                      className="img-thumbnail"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.selectChartType("lineChart", "Line Chart")
                      }
                    />
                    Line Chart
                  </div>
                  <div className="col-md-4">
                    <img
                      src={imgDualLine}
                      alt="dual-line chart"
                      className="img-thumbnail"
                      // style={{ cursor: "pointer" }}
                      style={{ cursor: "not-allowed" }}
                      onClick={() => false
                        // this.selectChartType("dualLineChart", "Dual Line Chart")
                      }
                    />
                    Dual Line Chart
                  </div>
                </div>
                <div className="p-3"></div>
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={imgBar}
                      alt="bar chart"
                      className="img-thumbnail"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.selectChartType("barChart", "Bar Chart")
                      }
                    />
                    Bar Chart
                  </div>
                  <div className="col-md-4">
                    <img
                      src={imgPie}
                      alt="pie chart"
                      className="img-thumbnail"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.selectChartType("pieChart", "Pie Chart")
                      }
                    />
                    Pie Chart
                  </div>
                  <div className="col-md-4">
                    <img
                      src={imgBubble}
                      alt="bubble chart"
                      className="img-thumbnail"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.selectChartType("bubbleChart", "Bubble Chart")
                      }
                    />
                    Bubble Chart
                  </div>
                </div>
                <div className="p-3"></div>
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={imgFilterBox}
                      alt="filter box"
                      className="img-thumbnail"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.selectChartType("filterBox", "Filter Box")
                      }
                    />
                    Filter box
                  </div>
                  <div className="col-md-4">
                    <img
                      src={imgBigNumber}
                      alt="big number"
                      className="img-thumbnail"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.selectChartType("bigNumber", "Big Number")
                      }
                    />
                    Big Number
                  </div>
                  <div className="col-md-4">
                    <img
                      src={imgWordCloud}
                      alt="word cloud"
                      className="img-thumbnail"
                      // style={{ cursor: "pointer" }}
                      style={{ cursor: "not-allowed" }}
                      onClick={
                        () => false
                        // this.selectChartType("wordCloud", "Word Cloud")
                      }
                    />
                    Word Cloud
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChartTypeModal;
