import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class DeleteDatabaseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delBtnClassName: "btn btn-secondary disabled"
    };

    this.delDatabaseModalCloseBtn = React.createRef();
    this.deleteDatabaseModalForm = React.createRef();
    this.delButton = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteDatabase = this.deleteDatabase.bind(this);
    this.closeModalEvent = this.closeModalEvent.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    let delKeyword = target.value;
    let isMatch = delKeyword.match("DELETE");

    if (isMatch) {
      let chgDelBtnStyle = "btn btn-danger";
      this.setState({ delBtnClassName: chgDelBtnStyle });
    } else {
      let chgDelBtnStyle = "btn btn-secondary disabled";
      this.setState({ delBtnClassName: chgDelBtnStyle });
    }
  }

  deleteDatabase() {
    let databaseId = this.props.databaseId;
    let delDatabaseModalCloseBtn = this.delDatabaseModalCloseBtn;
    let deleteDatabaseModalForm = this.deleteDatabaseModalForm;
    let searchDatabaseList = this.props.searchDatabaseList;

    AxiosConfig
      .delete("/api/data/database/delete-connection", {
        params: {
          databaseId: databaseId,
        },
      })
      .then(function (response) {
        // success
        deleteDatabaseModalForm.current.reset();
        delDatabaseModalCloseBtn.current.click();
        searchDatabaseList();
      })
      .catch(function (error) {
        // error
        //alert("Failed to delete this Connection.");
        MySwal.fire({
          icon: "error",
          text: "Failed to delete this Connection.",
        });
      })
      .then(function () {
        // finally
      });
  }

  closeModalEvent() {
    let modalForm = this.deleteDatabaseModalForm;
    let chgDelBtnStyle = "btn btn-secondary disabled";
    this.setState({ delBtnClassName: chgDelBtnStyle });
    modalForm.current.reset();
  }

  render() {
    return (
      <div
        className="modal fade"
        id="deleteDatabaseModal"
        tabIndex="-1"
        aria-labelledby="deleteDatabaseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteDatabaseModalLabel">
                Delete Database?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form ref={this.deleteDatabaseModalForm}>
                <div className="mb-3">
                  이 데이터베이스를 삭제하면 관련된 차트와 대시보드가 손상됩니다.
                </div>
                <div className="mb-3">계속 하시겠습니까?</div>
                <small style={{color: "lightgrey"}}>"DELETE"를 입력하세요.</small>
                <input
                  type="text"
                  className="form-control"
                  id="confirmDel"
                  name="confirmDel"
                  onChange={this.handleInputChange}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={this.closeModalEvent}
                ref={this.delDatabaseModalCloseBtn}
              >
                CANCEL
              </button>
              <button
                type="button"
                className={this.state.delBtnClassName}
                id="delete-database"
                name="delete-database"
                onClick={this.deleteDatabase}
                ref={this.delButton}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteDatabaseModal;
