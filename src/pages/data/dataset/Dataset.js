import React from "react";
import { Link } from "react-router-dom";
import AxiosConfig from "~/utils/AxiosConfig";
import { AgGridReact } from "ag-grid-react";
import ActionRenderer from "~/pages/data/dataset/DatasetActionRenderer";
import AddDatasetModal from "~/pages/data/dataset/AddDatasetModal";
import DeleteDatasetModal from "~/pages/data/dataset/DeleteDatasetModal";
import UpdateDatasetModal from "~/pages/data/dataset/UpdateDatasetModal";

const gridOptions = {
  // PROPERTIES
  // Objects like myRowData and myColDefs would be created in your application
  pagination: true,
  rowSelection: "single",
  isScrollLag: () => false,
};

class Dataset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      rowData: [],
      columnDefs: [],
      selectedRow: {},
      datasetId: "",
    };

    this.state.columnDefs = [
      { headerName: "Dataset Id", field: "datasetId", hide: true },
      { headerName: "Database Id", field: "databaseId", hide: true },
      {
        headerName: "Dataset Name",
        field: "datasetName",
        width: "300",
        sortable: true,
      },
      { headerName: "Type", field: "datasetType", sortable: true },
      { headerName: "Source", field: "source", sortable: true },
      { headerName: "Schema", field: "schema", sortable: true },
      { headerName: "Modified By", field: "modifiedBy", sortable: true },
      { headerName: "Last Modified", field: "modifiedDate", sortable: true },
      { headerName: "Action", field: "action", cellRenderer: "ActionRenderer" },
    ];

    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchDatasetList = this.searchDatasetList.bind(this);
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

  onCellClicked(params) {
    this.setState({
      datasetId: params.data.datasetId,
      selectedRow: {
        datasetId: params.data.datasetId,
        databaseId: params.data.databaseId,
        datasetName: params.data.datasetName,
        source: params.data.source,
        schema: params.data.schema,
      },
    });
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
        self.setState({ rowData: response.data });
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  componentDidMount() {
    this.searchDatasetList();
  }

  render() {
    return (
      <div>
        {/* <!-- Screen menu --> */}
        <nav
          className="navbar navbar-expand-sm navbar-light bg-white shadow-sm"
          aria-label="Third navbar example"
        >
          <div className="container-fluid">
            <Link to="#" className="navbar-brand">
              Data
            </Link>
            <div className="collapse navbar-collapse" id="navbarsExample03">
              <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                <li className="nav-item">
                  <Link to="/data/database/list" className="nav-link">
                    Database
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/data/dataset/list" className="nav-link active">
                    Dataset
                  </Link>
                </li>
              </ul>
              <form className="d-flex">
                <button
                  className="btn btn-success"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#addDatasetModal"
                >
                  + Dataset
                </button>
              </form>
            </div>
          </div>
        </nav>
        {/* <!-- Search --> */}
        <div className="container-fluid">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <div className="row align-items-start">
              <div className="input-group mb-3">
                <input
                  name="searchKeyword"
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search keyword"
                  aria-describedby="button-addon2"
                  onChange={this.handleInputChange}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={this.searchDatasetList}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Grid Area --> */}
        <div className="container-fluid">
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: 500 }}
          >
            <AgGridReact
              rowData={this.state.rowData}
              columnDefs={this.state.columnDefs}
              gridOptions={gridOptions}
              defaultColDef={{ resizable: true }}
              frameworkComponents={{ ActionRenderer }}
              onCellClicked={(params) => this.onCellClicked(params)}
            />
          </div>
        </div>
        {/* <!-- Modal --> */}
        <AddDatasetModal searchDatasetList={this.searchDatasetList} />
        <DeleteDatasetModal
          datasetId={this.state.datasetId}
          searchDatasetList={this.searchDatasetList}
        />
        <UpdateDatasetModal
          selectedRow={this.state.selectedRow}
          searchDatasetList={this.searchDatasetList}
        />
      </div>
    );
  }
}

export default Dataset;
