import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosConfig from "@utils/axiosConfig";
import * as actions from "@modules/user/session";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import "@styles/App.css";
import "@styles/signin.css";

interface LoginInfo {
  loginId: string;
  firstName: string;
  lastName: string;
  tel: string;
  email: string;
  address1: string;
  address2: string;
  token: string;
  authorities: string[];
  isValid: boolean;
  loginTime: number;
  lastAccessTime: number;
  loginYn: Boolean;
}

const MySwal = withReactContent(Swal);

const Login = (props: any) => {
  const dispatch = useDispatch();
  let intFrameHeight = window.innerHeight - 56;
  const navigate = useNavigate();

  const loginUserName = useRef<HTMLInputElement>(null);
  const loginUserPassword = useRef<HTMLInputElement>(null);
  const loginSubmit = useRef<HTMLButtonElement>(null);

  const goLogin = () => {
    console.log("goLogin()");
    //test
    // let sample = {
    //   loginId: "sample",
    //   token: "1234-5678",
    // };
    // session.setCookie("session", JSON.stringify(sample));
    // console.log(session.getCookie("session"));
    //navigate("/");

    let username = "";
    let email = "";
    if (loginUserName.current !== null) {
      let idx = loginUserName.current.value.indexOf("@");
      username = loginUserName.current.value.substring(0, idx);

      email = loginUserName.current.value;
    }
    let password = "";
    if (loginUserPassword.current !== null) {
      password = loginUserPassword.current.value;
    }
    console.log("username: " + username);
    console.log("password: " + password);
    axiosConfig
      .post("/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        // success
        const now = new Date();
        const currentTime: number = now.getTime();
        let loginInfo: LoginInfo = {
          loginId: response.data.username,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          tel: response.data.tel,
          email: response.data.email,
          address1: response.data.address1,
          address2: response.data.address2,
          token: response.data.token,
          authorities: response.data.authorities,
          isValid: response.data.isValid,
          loginTime: currentTime,
          lastAccessTime: currentTime,
          loginYn: true,
        };
        
        // 1. redux store
        dispatch(actions.setLoginInfo(loginInfo));

        // 2. browser Local storage
        global.localStorage.setItem(
          "loginInfo",
          JSON.stringify({
            loginId: loginInfo.loginId,
            firstName: loginInfo.firstName,
            lastName: loginInfo.lastName,
            tel: loginInfo.tel,
            email: loginInfo.email,
            address1: loginInfo.address1,
            address2: loginInfo.address2,
            token: loginInfo.token,
            authorities: loginInfo.authorities,
            isValid: loginInfo.isValid,
            loginTime: loginInfo.loginTime,
            lastAccessTime: loginInfo.lastAccessTime,
            loginYn: loginInfo.loginYn,
          })
        );

        axiosConfig.defaults.headers.common["x-auth-token"] = response.data.token;

        navigate("/");
      })
      .catch(function (error) {
        // error
        MySwal.fire({
          icon: "error",
          text: "로그인에 실패하였습니다.",
        });
      })
      .then(function () {
        // finally
      });
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      loginSubmit.current?.click();
    }
  };
  return (
    <div
      className="text-center"
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: "40px",
        paddingBottom: "40px",
        backgroundColor: "#ffffff",
        height: intFrameHeight,
        margin: "0",
      }}
    >
      <main
        className="form-signin"
        style={{
          width: "100%",
          maxWidth: "430px",
          padding: "15px",
          margin: "auto",
          display: "block",
        }}
      >
        <img
          className="mb-4"
          src="/images/login/asterik.png"
          alt=""
          width="72"
          height="72"
        />
        <div className="card border-0">
          <h1 className="h1 mb-3 fw-bold">Read with us</h1>
          <article className="card-body">
            <form>
              <div className="form-group">
                <input
                  name=""
                  className="form-control form-control-lg"
                  placeholder="이메일을 입력하세요"
                  type="email"
                  ref={loginUserName}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                  ref={loginUserPassword}
                />
              </div>
              <div className="form-group">
                <div className="checkbox" style={{ float: "left" }}>
                  <input type="checkbox" />
                  <label style={{ verticalAlign: "1.5px" }}>
                    &nbsp;자동 로그인
                  </label>
                </div>
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-lg btn-info w-100"
                  style={{
                    backgroundColor: "#00BAA4",
                    color: "white",
                    fontSize: "110%",
                  }}
                  onClick={goLogin}
                  ref={loginSubmit}
                >
                  로그인
                </button>
              </div>
              <div className="form-group">
                <Link
                  to="/signup"
                  className="btn btn-lg btn-outline-secondary w-100"
                  style={{ fontSize: "110%" }}
                >
                  회원가입
                </Link>
              </div>
              <Link
                to="#"
                className="float-right"
                style={{ color: "#888", textDecoration: "none" }}
              >
                비밀번호를 잊어버리셨나요?
              </Link>
            </form>
          </article>
        </div>
      </main>
    </div>
  );
};

export default Login;
