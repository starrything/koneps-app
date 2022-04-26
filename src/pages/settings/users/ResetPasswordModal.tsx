import React, { useState, useEffect, useRef } from "react";
import axiosConfig from "@utils/axiosConfig";
import { isEmpty } from "@utils/valid";
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
const ResetPasswordModal = (props: any) => {
  const modalForm = useRef<HTMLFormElement>(null);
  const closeResetPassword = useRef<HTMLButtonElement>(null);

  const [formFields, setFormFields] = useState({
    resetPassword: "",
    confirmResetPassword: "",
  });
  const [formErrors, setFormErrors] = useState("");

  const resetPassword = () => {
    let fields = formFields;
    if (fields["resetPassword"] !== fields["confirmResetPassword"]) {
      setFormErrors("Passwords must match");
      return;
    } else if (fields["resetPassword"] === fields["confirmResetPassword"]) {
      setFormErrors("");
    }

    if (isEmpty(fields["resetPassword"])) {
      MySwal.fire({
        icon: "warning",
        text: "Please enter new password.",
      });
      return;
    }

    axiosConfig
      .put("/api/v1/user/reset-password", {
        password: fields["confirmResetPassword"],
      })
      .then(function (response) {
        // success
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "성공적으로 변경되었습니다.",
        });
        closeResetPassword.current?.click();
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "resetPassword") {
      if(value !== formFields["confirmResetPassword"]) {
        setFormErrors("Passwords must match");
      } else {
        setFormErrors("");
      }      
    } else if (name === "confirmResetPassword") {
      if(value !== formFields["resetPassword"]) {
        setFormErrors("Passwords must match");
      } else {
        setFormErrors("");
      }
    }

    const nextFormFields = {
      ...formFields,
      [name]: value,
    }
    setFormFields(nextFormFields);
  };

  const closeModalEvent = () => {
    setFormFields({ resetPassword: "", confirmResetPassword: "" });
    setFormErrors("");
    modalForm.current?.reset();
    props.handleClose();
  };
  return (
    <Modal
      open={props.open}
      onClose={closeModalEvent}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Reset My Password
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form ref={modalForm}>
            <div className="mb-3">
              Password*
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    id="resetPassword"
                    name="resetPassword"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              Confirm Password
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    id="confirmResetPassword"
                    name="confirmResetPassword"
                    onChange={(e) => handleInputChange(e)}
                  />
                  <span style={{ color: "red" }}>{formErrors}</span>
                </div>
              </div>
            </div>
          </form>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={resetPassword}
            >
              SAVE
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              //data-bs-dismiss="modal"
              ref={closeResetPassword}
              onClick={closeModalEvent}
            >
              CANCEL
            </button>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ResetPasswordModal;
