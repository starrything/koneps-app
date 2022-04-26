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
const DeleteRoleModal = (props: any) => {
  const delRoleModalCloseBtn = useRef<HTMLButtonElement>(null);
  const delButton = useRef<HTMLButtonElement>(null);

  const deleteRole = () => {
    let role = props.role;
    let searchRoleList = props.searchRoleList;

    axiosConfig.delete("/api/v1/role", {
      params: {
        role: role,
      },
    })
      .then(function (response) {
        // success
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "Success to delete this Role.",
        });
        delRoleModalCloseBtn.current?.click();
        searchRoleList();
        props.handleClose();
      })
      .catch(function (error) {
        // error
        //alert("Failed to delete this Role.");
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete this Role.",
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
              onClick={deleteRole}
            >
              OK
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              //data-bs-dismiss="modal"
              ref={delRoleModalCloseBtn}
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

export default DeleteRoleModal;
