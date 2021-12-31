import React from "react";
import { Link } from "react-router-dom";
import AxiosConfig from "~/utils/AxiosConfig";
import { AgGridReact } from "ag-grid-react";
import ActionRenderer from "~/pages/data/database/DatabaseActionRenderer";
import AddDatabaseModal from "~/pages/data/database/AddDatabaseModal";
import DeleteDatabaseModal from "~/pages/data/database/DeleteDatabaseModal";
import UpdateDatabaseModal from "~/pages/data/database/UpdateDatabaseModal";

const gridOptions = {
  // PROPERTIES
  // Objects like myRowData and myColDefs would be created in your application
  pagination: true,
  rowSelection: "single",
  isScrollLag: () => false,
};

class Database extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      rowData: [],
      columnDefs: [],
      databaseId: "",
      selectedRow: {},
    };

    this.state.columnDefs = [
      {headerName: 'Database Id', field: 'databaseId', hide: true},
      {headerName: 'Datasource Url', field: 'datasourceUrl', hide: true},
      {headerName: 'Database', field: 'databaseName', width: '300', sortable: true},
      {headerName: 'Created By', field: 'createdBy', sortable: true},
      {headerName: 'Last Modified', field: 'modifiedDate', sortable: true},
      {headerName: 'Action', field: 'action', cellRenderer: 'ActionRenderer'},
    ]

    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchDatabaseList = this.searchDatabaseList.bind(this);
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
      databaseId: params.data.databaseId,
      selectedRow: {
        databaseId: params.data.databaseId,
        databaseName: params.data.databaseName,
        datasourceUrl: params.data.datasourceUrl,
      },
    });
  }

  searchDatabaseList() {
    let self = this;
    let keyword = "";

    if (this.state.fields["searchKeyword"]) {
      keyword = this.state.fields["searchKeyword"];
    }

    AxiosConfig
      .get("/api/data/database/search", {
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
    this.searchDatabaseList();
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
                  <Link to="/data/database/list" className="nav-link active">
                    Database
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/data/dataset/list" className="nav-link">
                    Dataset
                  </Link>
                </li>
              </ul>
              <form className="d-flex">
                <button
                  className="btn btn-success"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#addDatabaseModal"
                >
                  + Database
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
                  onClick={this.searchDatabaseList}
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
        <AddDatabaseModal searchDatabaseList={this.searchDatabaseList} />
        <DeleteDatabaseModal
          databaseId={this.state.databaseId}
          searchDatabaseList={this.searchDatabaseList}
        />
        <UpdateDatabaseModal
          selectedRow={this.state.selectedRow}
          searchDatabaseList={this.searchDatabaseList}
        />
      </div>
    );
  }
}

export default Database;
