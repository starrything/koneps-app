import React, { useState, useRef } from "react";
import axiosConfig from "@utils/axiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const DeleteUserModal = (props: any) => {
  const [delBtnClassName, setDelBtnClassName] = useState(
    "btn btn-danger"
  );

  const delUserModalCloseBtn = useRef<HTMLButtonElement>(null);
  const delButton = useRef<HTMLButtonElement>(null);

  const deleteUser = () => {
    let username = props.username;
    let searchUserList = props.searchUserList;

    axiosConfig.delete("/api/user", {
      params: {
        username: username,
      },
    })
      .then(function (response) {
        // success
        delUserModalCloseBtn.current?.click();
        searchUserList();
      })
      .catch(function (error) {
        // error
        //alert("Failed to delete this User.");
        MySwal.fire({
          icon: "error",
          text: "Failed to delete this User.",
        });
      })
      .then(function () {
        // finally
      });
  };

  return (
    <div
      className="modal fade"
      id="deleteUserModal"
      //tabIndex="-1"
      aria-labelledby="deleteUserModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteUserModalLabel">
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
              ref={delUserModalCloseBtn}
            >
              CANCEL
            </button>
            <button
              type="button"
              className={delBtnClassName}
              id="delete-user"
              name="delete-user"
              onClick={deleteUser}
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

export default DeleteUserModal;
