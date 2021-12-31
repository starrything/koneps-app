import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class DeleteDatasetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delBtnClassName: "btn btn-secondary disabled",
    };

    this.delDatasetModalCloseBtn = React.createRef();
    this.deleteDatasetModalForm = React.createRef();
    this.delButton = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteDataset = this.deleteDataset.bind(this);
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
      console.log("Disabled")
      let chgDelBtnStyle = "btn btn-secondary disabled";
      this.setState({ delBtnClassName: chgDelBtnStyle });
    }
  }

  deleteDataset() {
    let datasetId = this.props.datasetId;
    let delDatasetModalCloseBtn = this.delDatasetModalCloseBtn;
    let deleteDatasetModalForm = this.deleteDatasetModalForm;
    let searchDatasetList = this.props.searchDatasetList;

    AxiosConfig.delete("/api/data/dataset", {
      params: {
        datasetId: datasetId,
      },
    })
      .then(function (response) {
        // success
        deleteDatasetModalForm.current.reset();
        delDatasetModalCloseBtn.current.click();
        searchDatasetList();
      })
      .catch(function (error) {
        // error
        //alert("Failed to delete this Dataset.");
        MySwal.fire({
          icon: "error",
          text: "Failed to delete this Dataset.",
        });
      })
      .then(function () {
        // finally
      });
  }

  closeModalEvent() {
    let modalForm = this.deleteDatasetModalForm;
    let chgDelBtnStyle = "btn btn-secondary disabled";
    this.setState({ delBtnClassName: chgDelBtnStyle });
    modalForm.current.reset();
  }

  render() {
    return (
      <div
        className="modal fade"
        id="deleteDatasetModal"
        tabIndex="-1"
        aria-labelledby="deleteDatasetModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteDatasetModalLabel">
                Delete Dataset?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form ref={this.deleteDatasetModalForm}>
                <div className="mb-3">
                  이 데이터세트를 삭제하면 관련된 차트와 대시보드가 손상됩니다.
                </div>
                <div className="mb-3">계속 하시겠습니까?</div>
                <small style={{ color: "lightgrey" }}>
                  "DELETE"를 입력하세요.
                </small>
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
                ref={this.delDatasetModalCloseBtn}
              >
                CANCEL
              </button>
              <button
                type="button"
                className={this.state.delBtnClassName}
                id="delete-dataset"
                name="delete-dataset"
                onClick={this.deleteDataset}
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

export default DeleteDatasetModal;
