import React, { useState, useRef } from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const DeleteDashboardModal = (props) => {
  const [delBtnClassName, setDelBtnClassName] = useState(
    "btn btn-secondary disabled"
  );

  const delDashboardModalCloseBtn = useRef();
  const deleteDashboardModalForm = useRef();
  const delButton = useRef();

  const handleInputChange = (event) => {
    const target = event.target;
    let delKeyword = target.value;
    let isMatch = delKeyword.match("DELETE");

    if (isMatch) {
      let chgDelBtnStyle = "btn btn-danger";
      setDelBtnClassName(chgDelBtnStyle);
    } else {
      let chgDelBtnStyle = "btn btn-secondary disabled";
      setDelBtnClassName(chgDelBtnStyle);
    }
  };

  const deleteDashboard = () => {
    let dashboardId = props.dashboardId;
    let searchDashboardList = props.searchDashboardList;

    AxiosConfig.delete("/api/dashboard", {
      params: {
        dashboardId: dashboardId,
      },
    })
      .then(function (response) {
        // success
        deleteDashboardModalForm.current.reset();
        delDashboardModalCloseBtn.current.click();
        searchDashboardList();
      })
      .catch(function (error) {
        // error
        //alert("Failed to delete this Dashboard.");
        MySwal.fire({
          icon: "error",
          text: "Failed to delete this Dashboard.",
        });
      })
      .then(function () {
        // finally
      });
  };

  const closeModalEvent = () => {
    let modalForm = deleteDashboardModalForm;
    let chgDelBtnStyle = "btn btn-secondary disabled";
    setDelBtnClassName(chgDelBtnStyle);
    modalForm.current.reset();
  };

  return (
    <div
      className="modal fade"
      id="deleteDashboardModal"
      tabIndex="-1"
      aria-labelledby="deleteDashboardModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteDashboardModalLabel">
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
            <form ref={deleteDashboardModalForm}>
              <div className="mb-3">Are you sure you want to delete?</div>
              <small style={{ color: "lightgrey" }}>
                "DELETE"를 입력하세요.
              </small>
              <input
                type="text"
                className="form-control"
                id="confirmDel"
                name="confirmDel"
                onChange={handleInputChange}
              />
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModalEvent}
              ref={delDashboardModalCloseBtn}
            >
              CANCEL
            </button>
            <button
              type="button"
              className={delBtnClassName}
              id="delete-dashboard"
              name="delete-dashboard"
              onClick={deleteDashboard}
              ref={delButton}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDashboardModal;
