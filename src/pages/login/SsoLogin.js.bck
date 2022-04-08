import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import AxiosConfig from "~/utils/AxiosConfig";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "~/modules/login/user";

const SsoLogin = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let { username, token } = useParams();

  useEffect(() => {
    //
    goSsoLogin();
  }, [])

  const goSsoLogin = () => {
    console.log("SsoLogin.js goSsoLogin()...")
    //TODO api
    AxiosConfig.post("/login", {
      username: username,
      token: token,
    })
      .then(function (response) {
        // success
        //TODO: set LoginUser Info & go to Main page
        let loginInfo = {};
        loginInfo.loginId = response.data.username;
        loginInfo.firstName = response.data.firstName;
        loginInfo.lastName = response.data.lastName;
        loginInfo.tel = response.data.tel;
        loginInfo.email = response.data.email;
        loginInfo.token = response.data.token;

        // redux store
        dispatch(actions.setLoginInfo(loginInfo));
        // browser Local storage
        global.localStorage.setItem(
          "loginInfo",
          JSON.stringify({
            loginId: loginInfo.loginId,
            firstName: loginInfo.firstName,
            lastName: loginInfo.lastName,
            tel: loginInfo.tel,
            email: loginInfo.email,
            token: loginInfo.token,
          })
        );
        AxiosConfig.defaults.headers["x-auth-token"] = response.data.token;

        history.push("/");
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };
  return (<div></div>);
};

export default SsoLogin;
