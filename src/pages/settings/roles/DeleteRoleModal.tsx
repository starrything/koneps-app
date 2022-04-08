import React, { useState, useRef } from "react";
import axiosConfig from "@utils/axiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const DeleteRoleModal = (props: any) => {
  const [delBtnClassName, setDelBtnClassName] = useState(
    "btn btn-danger"
  );

  const delRoleModalCloseBtn = useRef<HTMLButtonElement>(null);
  const delButton = useRef<HTMLButtonElement>(null);

  const deleteRole = () => {
    let role = props.role;
    let searchRoleList = props.searchRoleList;

    axiosConfig.delete("/api/role", {
      params: {
        role: role,
      },
    })
      .then(function (response) {
        // success
        delRoleModalCloseBtn.current?.click();
        searchRoleList();
      })
      .catch(function (error) {
        // error
        //alert("Failed to delete this Role.");
        MySwal.fire({
          icon: "error",
          text: "Failed to delete this Role.",
        });
      })
      .then(function () {
        // finally
      });
  };

  return (
    <div
      className="modal fade"
      id="deleteRoleModal"
      //tabIndex="-1"
      aria-labelledby="deleteRoleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteRoleModalLabel">
              User confirmation needed
            </h5>
          </div>
          <div className="modal-body">
            You sure you want to delete this item?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={delRoleModalCloseBtn}
            >
              CANCEL
            </button>
            <button
              type="button"
              className={delBtnClassName}
              id="delete-role"
              name="delete-role"
              onClick={deleteRole}
              ref={delButton}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoleModal;
