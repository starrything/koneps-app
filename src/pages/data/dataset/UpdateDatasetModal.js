import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class UpdateDatasetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      rowData: [],
      catalogSchemaList: [],
      tableList: [],
    };

    this.datasource = React.createRef();
    this.catalogSchema = React.createRef();

    this.datasetModal = React.createRef();
    this.updateDatasetModalForm = React.createRef();
    this.frmDatabaseName = React.createRef();
    this.frmDatasource = React.createRef();

    this.handleValidation = this.handleValidation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateDataset = this.updateDataset.bind(this);
    this.closeModalEvent = this.closeModalEvent.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedRow !== this.props.selectedRow) {
      this.getCatalogSchemaListByDatabaseId(this.props.selectedRow.datasetId);

      let fields = this.state.fields;
      fields["datasetId"] = this.props.selectedRow.datasetId;
      fields["tableName"] = this.props.selectedRow.datasetName;
      fields["datasource"] = this.props.selectedRow.source;
      fields["catalogSchema"] = this.props.selectedRow.schema;

      this.setState({
        fields: fields,
      });
    }
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
        this.setState({ fileds: fields });
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
        console.log(self.props.selectedRow.databaseId);
        self.getTablesByDatabaseIdAndCatalogSchema(
          self.props.selectedRow.databaseId,
          self.props.selectedRow.schema
        );
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

  updateDataset() {
    let searchDatasetList = this.props.searchDatasetList;
    let closeModal = this.datasetModal;
    let modalForm = this.updateDatasetModalForm;
    let datasetId = this.props.selectedRow.datasetId;

    if (!this.handleValidation()) {
      return false;
    }

    let catalogSchema = this.state.fields["catalogSchema"];
    let tableName = this.state.fields["tableName"];

    AxiosConfig.put("/api/data/dataset", {
      datasetId: datasetId,
      datasetName: tableName,
      schema: catalogSchema,
    })
      .then(function (response) {
        // success
        modalForm.current.reset();
        closeModal.current.click();
        searchDatasetList();
      })
      .catch(function (error) {
        // error
        //alert("Failed to save this Dataset.");
        MySwal.fire({
          icon: "error",
          text: "Failed to save this Dataset.",
        });
      })
      .then(function () {
        // finally
      });
  }

  closeModalEvent() {
    let modalForm = this.updateDatasetModalForm;
    modalForm.current.reset();
  }

  render() {
    return (
      <div
        className="modal fade"
        id="updateDatasetModal"
        tabIndex="-1"
        aria-labelledby="updateDatasetModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateDatasetModalLabel">
                Edit Database
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form ref={this.updateDatasetModalForm}>
                <div className="mb-3">
                  Datasource
                  <div className="row">
                    <div className="col">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="datasource"
                        value={this.state.fields["datasource"]}
                        ref={this.datasource}
                        disabled
                      >
                        <option value={this.props.selectedRow.source}>
                          {this.props.selectedRow.source}
                        </option>
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
                className="btn btn-outline-success"
                onClick={this.updateDataset}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateDatasetModal;
