import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class UpdateDatabaseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
      rowData: [],
    };

    this.databaseModal = React.createRef();
    this.databaseModalForm = React.createRef();
    this.frmDatabaseName = React.createRef();
    this.frmDatasource = React.createRef();

    this.handleValidation = this.handleValidation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validConnection = this.validConnection.bind(this);
    this.testConnection = this.testConnection.bind(this);
    this.updateDatabase = this.updateDatabase.bind(this);
    this.closeModalEvent = this.closeModalEvent.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedRow !== this.props.selectedRow) {
        let fields = this.state.fields;
        fields["databaseName"] = this.props.selectedRow.databaseName;
        fields["datasource"] = this.props.selectedRow.datasourceUrl;

        this.setState({
            fields: fields
        })
    }
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //databaseName
    if (!fields["databaseName"]) {
      formIsValid = false;
      errors["databaseName"] = "Cannot be empty";
    }

    if (typeof fields["databaseName"] !== "undefined") {
      //  if(!fields["databaseName"].match(/^[a-zA-Z]+$/)){
      //     formIsValid = false;
      //     errors["databaseName"] = "Only letters";
      //  }
    }

    //datasource
    if (!fields["datasource"]) {
      formIsValid = false;
      errors["datasource"] = "Cannot be empty";
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

  validConnection(type, username, password, database, isPostAction) {
    AxiosConfig
      .get("/api/data/database/test-connection", {
        params: {
          type: type,
          username: username,
          password: password,
          database: database,
        },
      })
      .then(function (response) {
        // success
        if (isPostAction) {
          // this is add Database Action.
        } else {
          // this is test Connection.
          //alert("Connection success.");
          MySwal.fire({
            icon: "success",
            text: "Connection success.",
          });
        }
      })
      .catch(function (error) {
        // error
        //alert("Connection failed.");
        MySwal.fire({
          icon: "error",
          text: "Connection failed.",
        });
        return false;
      })
      .then(function () {
        // finally
      });
  }

  testConnection() {
    let errors = {};
    if (!this.state.fields["datasource"]) {
      //alert("Data Source URL cannot be empty.");
      MySwal.fire({
        icon: "warning",
        text: "Data Source URL cannot be empty.",
      });
      errors["datasource"] = "Cannot be empty";
      this.setState({ errors: errors });
      return false;
    }
    const databaseType = this.state.fields["datasource"].split("://");
    let type = databaseType[0];
    const account = databaseType[1].split("@");
    let username = account[0].split(":")[0];
    let password = account[0].split(":")[1];
    let database = account[1];

    this.validConnection(type, username, password, database);
  }

  updateDatabase() {
    let searchDatabaseList = this.props.searchDatabaseList;
    let isPostAction = true;
    let closeModal = this.databaseModal;
    let modalForm = this.databaseModalForm;
    let databaseId = this.props.selectedRow.databaseId;

    if (!this.handleValidation()) {
      return false;
    }

    let databaseName = this.state.fields["databaseName"];
    const databaseType = this.state.fields["datasource"].split("://");
    let type = databaseType[0];
    const account = databaseType[1].split("@");
    let username = account[0].split(":")[0];
    let password = account[0].split(":")[1];
    let database = account[1];

    this.validConnection(type, username, password, database, isPostAction);

    AxiosConfig
      .put("/api/data/database/update-connection", {
        databaseId: databaseId,
        databaseName: databaseName,
        type: type,
        username: username,
        password: password,
        database: database,
      })
      .then(function (response) {
        // success
        modalForm.current.reset();
        closeModal.current.click();
        searchDatabaseList();
      })
      .catch(function (error) {
        // error
        //alert("Failed to save this Connection.");
        MySwal.fire({
          icon: "error",
          text: "Failed to save this Connection.",
        });
      })
      .then(function () {
        // finally
      });
  }

  closeModalEvent() {
    let modalForm = this.databaseModalForm;
    modalForm.current.reset();
  }

  render() {
    return (
      <div
        className="modal fade"
        id="updateDatabaseModal"
        tabIndex="-1"
        aria-labelledby="updateDatabaseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateDatabaseModalLabel">
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
              <form ref={this.databaseModalForm}>
                <div className="mb-3">
                  Database Name*
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        id="databaseName"
                        name="databaseName"
                        value={this.state.fields["databaseName"]}
                        onChange={this.handleInputChange}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["databaseName"]}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  Data Source URL*{this.state.datasource}
                  <div className="row">
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        id="datasource"
                        name="datasource"
                        value={this.state.fields["datasource"]}
                        onChange={this.handleInputChange}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["datasource"]}
                      </span>
                    </div>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={this.testConnection}
                      >
                        TEST CONNECTION
                      </button>
                    </div>
                  </div>
                  <small>
                    (refer this :
                    mysql://username:password@host-address:port/scheme)
                  </small>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={this.databaseModal}
                onClick={this.closeModalEvent}
              >
                CANCEL
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={this.updateDatabase}
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

export default UpdateDatabaseModal;
