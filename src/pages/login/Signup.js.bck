import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Signup = (props) => {
  let history = useHistory();
  let intFrameHeight = window.innerHeight - 56;

  const [userinfo, setUserinfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = userinfo;
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let formValue = value;

    if (name === "password" || name === "confirmPassword") {
      let currPassword = "";
      let currConfirmPassword = "";
      if (name === "password") {
        currPassword = value;
        currConfirmPassword = confirmPassword;
      }
      if (name === "confirmPassword") {
        currPassword = password;
        currConfirmPassword = value;
      }

      if (currPassword === currConfirmPassword) {
        setPasswordError("");
      } else {
        setPasswordError("Passwords must match");
      }
    }

    const nextUserinfo = {
      //스프레드 문법으로 기존의 객체를 복사한다.
      ...userinfo,
      [name]: formValue,
    };
    //만든 변수를 seInput으로 변경해준다.
    setUserinfo(nextUserinfo);
  };

  const register = () => {
    if (name.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }
    if (password.length === 0 || passwordError.length > 0) {
      return;
    }

    AxiosConfig.post("/api/user/register", {
      name: name,
      email: email,
      password: password,
    })
      .then(function (response) {
        // success
        MySwal.fire({
          icon: "success",
          text: "Success!",
        });
        history.push("/");
      })
      .catch(function (error) {
        // error
        //alert("Failed to save this Dataset.");
        MySwal.fire({
          icon: "error",
          text: "Failed to registration.",
        });
      })
      .then(function () {
        // finally
      });
  };

  return (
    // <div className="container">
    //   <form className="row g-3">
    //     <div className="col-md-6">
    //       <label for="firstName" className="form-label">
    //         First Name
    //       </label>
    //       <input type="input" className="form-control" id="firstName" />
    //     </div>
    //     <div className="col-md-6">
    //       <label for="lastName" className="form-label">
    //         Last Name
    //       </label>
    //       <input type="input" className="form-control" id="lastName" />
    //     </div>
    //     <div className="col-md-12">
    //       <label for="inputEmail4" className="form-label">
    //         Email
    //       </label>
    //       <input type="email" className="form-control" id="inputEmail4" />
    //     </div>
    //     <div className="col-md-6">
    //       <label for="inputPassword" className="form-label">
    //         Password
    //       </label>
    //       <input type="password" className="form-control" id="inputPassword" />
    //     </div>
    //     <div className="col-md-6">
    //       <label for="repeatPassword" className="form-label">
    //         Repeat Your Password
    //       </label>
    //       <input type="password" className="form-control" id="repeatPassword" />
    //     </div>
    //     <div className="col-12">
    //       <button type="submit" className="btn btn-primary">
    //         Sign in
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#f5f5f5",
        height: intFrameHeight,
        margin: "0",
      }}
    >
      <div className="row min-vh-55 flex-center g-0">
        <div className="col-lg-8 col-xxl-5 py-3 position-relative">
          <div className="card overflow-hidden z-index-1">
            <div className="card-body p-0">
              <div className="row g-0 h-100">
                <div className="col-md-5 text-center bg-card-gradient">
                  <div className="position-relative p-4 pt-md-5 pb-md-7 light">
                    <div className="bg-holder bg-auth-card-shape"></div>
                    {/* <!--/.bg-holder--> */}
                    <div className="z-index-1 position-relative">
                      <Link
                        className="link-dark mb-4 font-sans-serif fs-4 d-inline-block fw-bolder"
                        to="/"
                      >
                        KONEPS
                      </Link>
                      <p className="opacity-75 text-black">
                        저희 서비스에 머무르시는 동안,
                        <br />
                        KONEPS에서 공공 소프트웨어 프로젝트에 대한 인사이트를
                        얻어가세요!
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 mb-4 mt-md-4 mb-md-5 light">
                    <p className="pt-3 text-black">
                      Have an account?
                      <br />
                      <Link
                        className="btn btn-outline-dark mt-2 px-4"
                        to="/login"
                      >
                        Log In
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-md-7 d-flex flex-center">
                  <div className="p-4 p-md-5 flex-grow-1">
                    <h3>Register</h3>
                    <form>
                      <div className="mb-3">
                        <label className="form-label" for="name">
                          Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          autocomplete="on"
                          id="name"
                          name="name"
                          value={name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" for="email">
                          Email address
                        </label>
                        <input
                          className="form-control"
                          type="email"
                          autocomplete="on"
                          id="email"
                          name="email"
                          value={email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="row gx-2">
                        <div className="mb-3 col-sm-6">
                          <label className="form-label" for="password">
                            Password
                          </label>
                          <input
                            className="form-control"
                            type="password"
                            autocomplete="on"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3 col-sm-6">
                          <label className="form-label" for="confirm-password">
                            Confirm Password
                          </label>
                          <input
                            className="form-control"
                            type="password"
                            autocomplete="on"
                            id="confirm-password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleInputChange}
                          />
                          <font style={{ color: "red" }}>{passwordError}</font>
                        </div>
                      </div>
                      {/* TODO: activate terms & privacy policy */}
                      {/* <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="card-register-checkbox"
                        />
                        <label
                          className="form-label"
                          for="card-register-checkbox"
                        >
                          I accept the <Link to="#">terms </Link>and{" "}
                          <Link to="#">privacy policy</Link>
                        </label>
                      </div> */}
                      <div className="mb-3">
                        <button
                          className="btn btn-primary d-block w-100 mt-3"
                          type="button"
                          name="submit"
                          onClick={register}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                    {/* TODO: Social Login */}
                    {/* <div className="position-relative mt-4">
                      <hr className="bg-300" />
                      <div className="divider-content-center">
                        or register with
                      </div>
                    </div>
                    <div className="row g-2 mt-2">
                      <div className="col-sm-6">G Login</div>
                      <div className="col-sm-6">F Login</div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
