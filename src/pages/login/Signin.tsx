import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosConfig from "@utils/axiosConfig";
import * as actions from "@modules/user/session";
import { Box, Container, Grid, CssBaseline, TextField, Typography } from "@mui/material";
import Button, { ButtonProps } from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { purple } from '@mui/material/colors';
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

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const MySwal = withReactContent(Swal);

const theme = createTheme();

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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ pt: 8.5, pb: 6, textAlign: "left" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            className="mb-4"
            src="/images/login/asterik.png"
            alt=""
            width="72"
            height="72"
          />
          <Typography component="h1" variant="h3">
            Please with us!
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  placeholder="이메일을 입력하세요"
                  type="email"
                  autoFocus
                  ref={loginUserName} />
              </Grid>
              <Grid item xs={12}>
                <TextField required
                  fullWidth
                  id="password"
                  label="password"
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                  ref={loginUserPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="checkbox" style={{ float: "left" }}>
                  <input type="checkbox" />
                  <label style={{ verticalAlign: "1.5px" }}>
                    &nbsp;자동 로그인
                  </label>
                </div>
              </Grid>
              <Grid item xs={12}>
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
                  Sign in
                </button>
              </Grid>
              <Grid item xs={12}>
                <Link
                  to="/signup"
                  className="btn btn-lg btn-outline-secondary w-100"
                  style={{ fontSize: "110%" }}
                >
                  Register
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link
                  to="#"
                  className="float-right"
                  style={{ color: "#888", textDecoration: "none" }}
                >
                  비밀번호를 잊어버리셨나요?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
