import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axiosConfig from "@utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

const theme = createTheme();

interface Signup {
  codeList: [{ code: string; value: string }];
}

const Signup = (props: any) => {
  useEffect(() => {
    // 컴포넌트 로드시 1번 실행
    getCodeList();
    getLocList();
  }, []);

  const [codeList, setCodeList] = useState<Signup["codeList"]>([
    { code: "", value: "" },
  ]);
  const [locList, setLocList] = useState<Signup["codeList"]>([
    { code: "", value: "" },
  ]);

  let navigate = useNavigate();
  let intFrameHeight = window.innerHeight - 56;

  const [userinfo, setUserinfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = userinfo;
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (event: any) => {
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

  /*
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
*/

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

    axiosConfig
      .post("/api/user/signup", {
        username: name,
        email: email,
        password: password,
      })
      .then(function (response) {
        // success
        MySwal.fire({
          icon: "success",
          text: "Success!",
        });
        navigate("/");
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

  const getCodeList = () => {
    axiosConfig
      .get("/api/code", {
        params: {
          code: "INTEREST_TOPIC",
        },
      })
      .then(function (response) {
        // success
        setCodeList(response.data);
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };

  const getLocList = () => {
    axiosConfig
      .get("/api/code", {
        params: {
          code: "INTEREST_LOC",
        },
      })
      .then(function (response) {
        // success
        setLocList(response.data);
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="비밀번호 재확인"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  //autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="이름"
                  value={name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="date"
                  label="생년월일"
                  type="date"
                  defaultValue="2017-05-24"
                  sx={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="mb-3" style={{ paddingTop: "10px" }}>
                  <label
                    className="form-label"
                    htmlFor="name"
                    style={{ float: "left" }}
                  >
                    관심 주제
                  </label>
                  <ul className="mylist" style={{ clear: "both" }}>
                    {codeList.map((code, key) => (
                      <li key={key}>
                        <input
                          type="checkbox"
                          className="btn-check btn-secondary"
                          id={code.code}
                          autoComplete="off"
                          value={code.code}
                        />
                        <label
                          className="btn btn-sm btn-outline-secondary"
                          htmlFor={code.code}
                        >
                          {code.value}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="mb-3"
                  style={{ paddingTop: "15px", clear: "both" }}
                >
                  <label
                    className="form-label"
                    htmlFor="name"
                    style={{ float: "left" }}
                  >
                    관심 지역
                  </label>
                  <ul className="mylist" style={{ clear: "both" }}>
                    {locList.map((code, key) => (
                      <li key={key}>
                        <input
                          type="checkbox"
                          className="btn-check btn-secondary"
                          id={code.code}
                          autoComplete="off"
                          value={code.code}
                        />
                        <label
                          className="btn btn-sm btn-outline-secondary"
                          htmlFor={code.code}
                        >
                          {code.value}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={register}
            >
              가입하기
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Signup;
