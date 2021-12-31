import React, { useState, useRef } from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UpdateDashboardModal = (props) => {
  const [delBtnClassName, setDelBtnClassName] = useState(
    "btn btn-secondary disabled"
  );

  const udtDashboardModalCloseBtn = useRef();
  const updateDashboardModalForm = useRef();
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

  const deleteChart = () => {
    let dashboardId = props.dashboardId;
    let searchDashboardList = props.searchDashboardList;

    AxiosConfig.put("/api/dashboard", {
      params: {
        dashboardId: dashboardId,
      },
    })
      .then(function (response) {
        // success
        updateDashboardModalForm.current.reset();
        udtDashboardModalCloseBtn.current.click();
        searchDashboardList();
      })
      .catch(function (error) {
        // error
        //alert("Failed to update this Dashboard.");
        MySwal.fire({
          icon: "error",
          text: "Failed to update this Dashboard.",
        });
      })
      .then(function () {
        // finally
      });
  };

  const closeModalEvent = () => {
    let modalForm = updateDashboardModalForm;
    let chgDelBtnStyle = "btn btn-secondary disabled";
    setDelBtnClassName(chgDelBtnStyle);
    modalForm.current.reset();
  };

  return (
    <div
      className="modal fade"
      id="updateDashboardModal"
      tabIndex="-1"
      aria-labelledby="updateDashboardModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateDashboardModalLabel">
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
            <form ref={updateDashboardModalForm}>
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
              ref={udtDashboardModalCloseBtn}
            >
              CANCEL
            </button>
            <button
              type="button"
              className={delBtnClassName}
              id="delete-dashboard"
              name="delete-dashboard"
              onClick={deleteChart}
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

export default UpdateDashboardModal;
