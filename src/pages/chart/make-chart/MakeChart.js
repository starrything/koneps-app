import React from "react";
import MakeChartLeftPanel from "~/pages/chart/make-chart/MakeChartLeftPanel";
import MakeChartRightPanel from "~/pages/chart/make-chart/MakeChartRightPanel";

class MakeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      datasetId: this.props.location.state.datasetId,
      chartType: this.props.location.state.chartType,
      currChartType: this.props.location.state.chartType,
      chartId: this.props.location.state.chartId,
    };
  }

  render() {
    return (
      <div>
        <div className="container-fluid" id="explore-container">
          <div
            className="row"
            style={{ padding: 5, paddingTop: 10 }}
            id="makeChartComponent"
          >
            <div className="col-sm-4">
              {/* Left Control Pannel */}
              <MakeChartLeftPanel
                chartId={this.state.chartId}
                datasetId={this.state.datasetId}
                chartType={this.state.chartType}
              />
            </div>
            <div className="col-sm-8">
              {/* Right Graph Pannel */}
              <MakeChartRightPanel />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MakeChart;
