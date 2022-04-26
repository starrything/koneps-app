import React, { useState, useRef } from "react";
import axiosConfig from "@utils/axiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Box, Modal, Typography } from "@mui/material";

const MySwal = withReactContent(Swal);

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const DeleteUserModal = (props: any) => {
  const delUserModalCloseBtn = useRef<HTMLButtonElement>(null);

  const deleteUser = () => {
    let username = props.username;
    let searchUserList = props.searchUserList;

    axiosConfig.delete("/api/v1/user", {
      params: {
        username: username,
      },
    })
      .then(function (response) {
        // success
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "Success to delete this User.",
        });
        delUserModalCloseBtn.current?.click();
        searchUserList();
        props.handleClose();
      })
      .catch(function (error) {
        // error
        //alert("Failed to delete this User.");
        MySwal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to delete this User.",
        });
        props.handleClose();
      })
      .then(function () {
        // finally
      });
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          User confirmation needed
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="modal-body">
            You sure you want to delete this item?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              id="delete-user"
              name="delete-user"
              onClick={deleteUser}
            >
              OK
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              //data-bs-dismiss="modal"
              ref={delUserModalCloseBtn}
              onClick={props.handleClose}
            >
              CANCEL
            </button>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default DeleteUserModal;
