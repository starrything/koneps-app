import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class AddDatasetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addBtnClassName: "btn btn-outline-success disabled",
      isValid: "",
      fields: {},
      errors: {},
      rowData: [],
      datasourceList: [],
      catalogSchemaList: [],
      tableList: [],
    };

    this.datasource = React.createRef();
    this.catalogSchema = React.createRef();

    this.datasetModal = React.createRef();
    this.datasetModalForm = React.createRef();
    this.addBudtton = React.createRef();

    this.handleValidation = this.handleValidation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getDatasourceList = this.getDatasourceList.bind(this);
    this.getCatalogSchemaListByDatabaseId =
      this.getCatalogSchemaListByDatabaseId.bind(this);
    this.getTablesByDatabaseIdAndCatalogSchema =
      this.getTablesByDatabaseIdAndCatalogSchema.bind(this);
    this.addDataset = this.addDataset.bind(this);
    this.closeModalEvent = this.closeModalEvent.bind(this);
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //datasource
    if (!fields["datasource"]) {
      formIsValid = false;
      errors["datasource"] = "Cannot be empty";
    }
    //catalog-schema
    if (!fields["catalogSchema"]) {
      formIsValid = false;
      errors["catalogSchema"] = "Cannot be empty";
    }
    //tableName
    if (!fields["tableName"]) {
      formIsValid = false;
      errors["tableName"] = "Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleInputChange(event) {
    let fields = this.state.fields;
    let errors = {};

    let prevDatasource = this.state.fields["datasource"];
    let currDatasource = this.datasource.current.value;
    let prevCatalogSchema = this.state.fields["catalogSchema"];
    let currCatalogSchema = this.catalogSchema.current.value;

    const target = event.target;
    const name = target.name;
    fields[name] = target.type === "checkbox" ? target.checked : target.value;

    errors[target.name] = "";

    this.setState({
      errors: errors,
      fields: fields,
    });

    // case: level1
    if (name === "datasource") {
      if (prevDatasource !== currDatasource) {
        // getSchemaByDatabaseId
        this.getCatalogSchemaListByDatabaseId(target.value);
      }
    }
    // case: level2
    if (name === "catalogSchema") {
      if (prevCatalogSchema !== currCatalogSchema) {
        // getSchemaByDatabaseId
        this.getTablesByDatabaseIdAndCatalogSchema(
          currDatasource,
          target.value
        );
      }

      if (target.value.length === 0) {
        fields["tableName"] = "";
        this.setState({fileds: fields});
      }
    }

    // control add Button state
    let datasource = this.state.fields["datasource"];
    let catalogSchema = this.state.fields["catalogSchema"];
    let tableName = this.state.fields["tableName"];

    if (datasource && catalogSchema && tableName) {
      let chgAddBtnStyle = "btn btn-success";
      this.setState({ addBtnClassName: chgAddBtnStyle });
    } else {
      let chgAddBtnStyle = "btn btn-outline-success disabled";
      this.setState({ addBtnClassName: chgAddBtnStyle });
    }
  }
  
  getDatasourceList() {
    let self = this;

    AxiosConfig.get("/api/data/dataset/datasource/list")
      .then(function (response) {
        // success
        self.setState({ datasourceList: response.data });

        // inintiate -> set First Datasource
        let firstDatabaseId = response.data[0].databaseId;
        let fields = self.state.fields;
        fields["datasource"] = firstDatabaseId;
        self.setState({ fields: fields });

        self.getCatalogSchemaListByDatabaseId(firstDatabaseId);
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  getCatalogSchemaListByDatabaseId(databaseId) {
    // init
    let fields = this.state.fields;
    fields["catalogSchema"] = "";
    fields["tablename"] = "";
    this.setState({ catalogSchemaList: [], tableList: [], fields: fields });

    let self = this;

    AxiosConfig.get("/api/data/dataset/catalog-schema", {
      params: {
        databaseId: databaseId,
      },
    })
      .then(function (response) {
        // success
        self.setState({ catalogSchemaList: response.data });
      })
      .catch(function (error) {
        // error
        //alert("Failed to get catalogSchema List.");
        MySwal.fire({
          icon: "error",
          text: "Failed to get catalogSchema List.",
        });
      })
      .then(function () {
        // finally
      });
  }

  getTablesByDatabaseIdAndCatalogSchema(databaseId, catalogSchema) {
    // init before tableList
    let fields = this.state.fields;
    fields["tablename"] = "";
    this.setState({ tableList: [], fields: fields });

    let self = this;

    AxiosConfig.get("/api/data/dataset/tables", {
      params: {
        databaseId: databaseId,
        catalogSchema: catalogSchema,
      },
    })
      .then(function (response) {
        // success
        self.setState({ tableList: response.data });
      })
      .catch(function (error) {
        // error
        //alert("Failed to get Table List.");
        MySwal.fire({
          icon: "error",
          text: "Failed to get Table List.",
        });
      })
      .then(function () {
        // finally
      });
  }

  addDataset() {
    let self = this;
    let searchDatasetList = this.props.searchDatasetList;
    let closeModal = this.datasetModal;

    if (!this.handleValidation()) {
      return false;
    }

    let datasource = this.state.fields["datasource"];
    let catalogSchema = this.state.fields["catalogSchema"];
    let tableName = this.state.fields["tableName"];

    AxiosConfig.post("/api/data/dataset", {
      datasetName: tableName,
      datasetType: "Physical",
      source: datasource,
      schema: catalogSchema,      
    })
      .then(function (response) {
        // success
        let fields = self.state.fields;
        fields["catalogSchema"] = "";
        fields["tableName"] = "";
        self.setState({fields: fields});
        closeModal.current.click();
        searchDatasetList();
      })
      .catch(function (error) {
        // error
        //alert("Failed to add this Dataset.");
        MySwal.fire({
          icon: "error",
          text: "Failed to add this Dataset.",
        });
      })
      .then(function () {
        // finally
      });
  }

  closeModalEvent() {
    let modalForm = this.datasetModalForm;
    modalForm.current.reset();
  }

  componentDidMount() {
    this.getDatasourceList();
  }

  render() {
    return (
      <div
        className="modal fade"
        id="addDatasetModal"
        tabIndex="-1"
        aria-labelledby="addDatasetModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addDatasetModalLabel">
                Add Dataset
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form ref={this.datasetModalForm}>
                <div className="mb-3">
                  Datasource
                  <div className="row">
                    <div className="col">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="datasource"
                        value={this.state.fields["datasource"]}
                        onChange={this.handleInputChange}
                        ref={this.datasource}
                      >
                        {this.state.datasourceList.map((e, key) => {
                          return (
                            <option key={key} value={e.databaseId}>
                              ({e.type}) {e.datasourceName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  Catalog
                  <div className="row">
                    <div className="col">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="catalogSchema"
                        value={this.state.fields["catalogSchema"]}
                        onChange={this.handleInputChange}
                        ref={this.catalogSchema}
                      >
                        <option value="">Select</option>
                        {this.state.catalogSchemaList.map(
                          (catalogSchema, key) => {
                            return (
                              <option key={key} value={catalogSchema}>
                                {catalogSchema}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  Table
                  <div className="row">
                    <div className="col">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="tableName"
                        value={this.state.fields["tableName"]}
                        onChange={this.handleInputChange}
                      >
                        <option value="">Select</option>
                        {this.state.tableList.map((tableName, key) => {
                          return (
                            <option key={key} value={tableName}>
                              {tableName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={this.datasetModal}
                onClick={this.closeModalEvent}
              >
                CANCEL
              </button>
              <button
                type="button"
                className={this.state.addBtnClassName}
                onClick={this.addDataset}
                ref={this.state.addButton}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddDatasetModal;
