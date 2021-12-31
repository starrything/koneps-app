import React, { useState, useEffect, useRef } from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { isEmpty } from "~/utils/Valid";

const MySwal = withReactContent(Swal);
const ResetPasswordModal = (props) => {
  const modalForm = useRef();
  const closeResetPassword = useRef();

  const [passwordForm, setPasswordForm] = useState({ fields: {}, errors: {} });
  const [formFields, setFormFields] = useState({});
  const [formErrors, setFormErrors] = useState("");

  const resetPassword = () => {
    let fields = formFields;
    if (fields["resetPassword"] !== fields["confirmResetPassword"]) {
      //errors["confirmResetPassword"] = "Passwords must match";
      setFormErrors("Passwords must match");
      return;
    } else if (fields["resetPassword"] === fields["confirmResetPassword"]) {
      //errors["confirmResetPassword"] = "";
      setFormErrors("");
    }

    if(isEmpty(fields["resetPassword"])) {
      MySwal.fire({
        icon: "warning",
        text: "Please enter new password.",
      }); 
      return;
    }

    AxiosConfig.put("/api/user/reset-password", {
        password: fields["confirmResetPassword"],
    })
      .then(function (response) {
        // success
        MySwal.fire({
          icon: "success",
          text: "sucess",
        });        
        closeResetPassword.current.click();
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };

  const handleInputChange = (event) => {
    let fields = formFields;
    let errors = formErrors;

    const target = event.target;
    const name = target.name;
    fields[name] = target.type === "checkbox" ? target.checked : target.value;

    if (
      name === "confirmResetPassword" &&
      fields["resetPassword"] !== target.value
    ) {
      setFormErrors("Passwords must match");
    } else if (
      name === "confirmResetPassword" &&
      fields["resetPassword"] === target.value
    ) {
      setFormErrors("");
    }
    console.log(fields);
    console.log(errors);
    setFormFields(fields);
  };

  const closeModalEvent = () => {
    setFormFields({});
    setFormErrors("");
    modalForm.current.reset();
  };
  return (
    <div
      className="modal fade"
      id="ResetPasswordModal"
      tabIndex="-1"
      aria-labelledby="ResetPasswordModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ResetPasswordModalLabel">
              Reset My Password
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
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
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={closeResetPassword}
              onClick={closeModalEvent}
            >
              CANCEL
            </button>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={resetPassword}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
