import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionOfDatasource from "~/modules/chart/datasetAndChartType";
import AxiosConfig from "~/utils/AxiosConfig";
import ChartTypeModal from "~/pages/chart/ChartTypeModal";

class AddChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      datasetList: [],
      currChartType: "Table",
      makeChartPath: {
        pathname: "/chart/make",
        search: "",
      },
    };

    this.state.fields["chartType"] = "table";

    this.chooseDataset = React.createRef();
    this.moveToMakeChart = React.createRef();

    this.searchDatasetList = this.searchDatasetList.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeChartType = this.changeChartType.bind(this);
    this.addChart = this.addChart.bind(this);
  }

  searchDatasetList() {
    let self = this;
    let keyword = "";

    if (this.state.fields["searchKeyword"]) {
      keyword = this.state.fields["searchKeyword"];
    }

    AxiosConfig.get("/api/data/dataset/search", {
      params: {
        keyword: keyword,
      },
    })
      .then(function (response) {
        // success
        self.setState({ datasetList: response.data });
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    // dataset
    if (!fields["chooseDataset"]) {
      formIsValid = false;
      errors["chooseDataset"] = "Cannot be empty";
    }

    // chartType
    if (!fields["chartType"]) {
      formIsValid = false;
      errors["chartType"] = "Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleInputChange(event) {
    let fields = this.state.fields;
    let errors = {};

    const target = event.target;
    const name = target.name;
    fields[name] = target.type === "checkbox" ? target.checked : target.value;

    errors[target.name] = "";

    this.setState({
      errors: errors,
      fields: fields,
    });
  }

  changeChartType(chartTypeValue, currChartType) {
    let fields = this.state.fields;
    fields["chartType"] = chartTypeValue;

    this.setState({ fields: fields, currChartType: currChartType });
  }

  addChart() {
    let datasetId = this.state.fields["chooseDataset"];
    let chartType = this.state.fields["chartType"];
    
    this.props.setDatasetId(datasetId);
    this.props.setChartType(chartType);

    if (!this.handleValidation()) {
      return false;
    }
    // but you can use a location instead
    const location = {
      pathname: "/chart/make",
      state: { datasetId: datasetId, chartType: chartType },
    };
    // Move to Chart workspace page - use queryString
    // let makeChartPath = this.state.makeChartPath;
    // makeChartPath["search"] =
    //   "?datasetId=" + datasetId + "&chartType=" + chartType;

    this.setState({ makeChartPath: location }, () => {
      this.moveToMakeChart.current.click();
    });
  }

  componentDidMount() {
    this.searchDatasetList();
  }

  render() {
    return (
      <div>
        <div className="col">
          <div className="p-5 text-white bg-dark mh-100">
            <h2>Create a new Chart</h2>
            <div className="p-3"></div>
            <form>
              <div className="row">
                <div className="col-3">
                  <p>Choose a Dataset</p>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="chooseDataset"
                    value={this.state.fields["chooseDataset"]}
                    onChange={this.handleInputChange}
                    ref={this.chooseDataset}
                  >
                    <option value="">Choose a dataset</option>
                    {this.state.datasetList.map((e, key) => {
                      return (
                        <option key={key} value={e.datasetId}>
                          {e.source}.{e.datasetName}
                        </option>
                      );
                    })}
                  </select>
                  <span style={{ color: "red" }}>
                    {this.state.errors["chooseDataset"]}
                  </span>
                </div>
              </div>
              <div className="p-3"></div>
              <div className="row">
                <div className="col-3">
                  <p>Choose a Visualization Type</p>
                  <button
                    className="btn btn-light"
                    type="button"
                    name="chartType"
                    value={this.state.fields["chartType"]}
                    data-bs-toggle="modal"
                    data-bs-target="#chartTypeModal"
                  >
                    {this.state.currChartType}
                  </button>
                  <span style={{ color: "red" }}>
                    {this.state.errors["chartType"]}
                  </span>
                </div>
              </div>
              <div className="p-3"></div>
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={this.addChart}
              >
                Create a new chart
              </button>
              {/* <Link
                to={{pathname: `/chart/make/chart-001`}}
                className="hide"
                ref={this.moveToMakeChart}
              /> */}
              <Link
                to={this.state.makeChartPath}
                className="hide"
                ref={this.moveToMakeChart}
              />
            </form>
          </div>
        </div>
        {/* <!-- Modal --> */}
        {/* TODO: Chart Type 코드관리 필요 */}
        <ChartTypeModal changeChartType={this.changeChartType} />
      </div>
    );
  }
}

// export default AddChart;

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  setDatasetId: (data) => dispatch(actionOfDatasource.setDatasetId(data)),
  setChartType: (data) => dispatch(actionOfDatasource.setChartType(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddChart);
