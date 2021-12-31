import React from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
class DeleteChartModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delBtnClassName: "btn btn-secondary disabled",
    };

    this.delChartModalCloseBtn = React.createRef();
    this.deleteChartModalForm = React.createRef();
    this.delButton = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteChart = this.deleteChart.bind(this);
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
      console.log("Disabled");
      let chgDelBtnStyle = "btn btn-secondary disabled";
      this.setState({ delBtnClassName: chgDelBtnStyle });
    }
  }

  deleteChart() {
    let chartId = this.props.chartId;
    let delChartModalCloseBtn = this.delChartModalCloseBtn;
    let deleteChartModalForm = this.deleteChartModalForm;
    let searchChartList = this.props.searchChartList;

    AxiosConfig.delete("/api/chart", {
      params: {
        chartId: chartId,
      },
    })
      .then(function (response) {
        // success
        deleteChartModalForm.current.reset();
        delChartModalCloseBtn.current.click();
        searchChartList();
      })
      .catch(function (error) {
        // error
        // alert("Failed to delete this Chart.");
        MySwal.fire({
          icon: "error",
          text: "Failed to delete this Chart.",
        });
      })
      .then(function () {
        // finally
      });
  }

  closeModalEvent() {
    let modalForm = this.deleteChartModalForm;
    let chgDelBtnStyle = "btn btn-secondary disabled";
    this.setState({ delBtnClassName: chgDelBtnStyle });
    modalForm.current.reset();
  }

  render() {
    return (
      <div
        className="modal fade"
        id="deleteChartModal"
        tabIndex="-1"
        aria-labelledby="deleteChartModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteChartModalLabel">
                Please Confirm
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form ref={this.deleteChartModalForm}>
                <div className="mb-3">Are you sure you want to delete?</div>
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
                ref={this.delChartModalCloseBtn}
              >
                CANCEL
              </button>
              <button
                type="button"
                className={this.state.delBtnClassName}
                id="delete-chart"
                name="delete-chart"
                onClick={this.deleteChart}
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

export default DeleteChartModal;
