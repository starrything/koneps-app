import * as React from "react";
import axiosConfig from "@utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Container, Grid, CssBaseline, TextField, Typography } from "@mui/material";
import Button, { ButtonProps } from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { purple } from '@mui/material/colors';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

interface Signup {
  codeList: [{ code: string; value: string }];
}

const MySwal = withReactContent(Swal);

const theme = createTheme();

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const Signup = (props: any) => {
  useEffect(() => {
    // TODO: call function at component mounted
  }, []);

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
            </Grid>
            <ColorButton type="button" size="large"
              fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
              onClick={register}>Register</ColorButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Signup;
