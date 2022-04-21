import * as React from "react";
import axiosConfig from "@utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Box, Container, Grid, CssBaseline, TextField, Typography } from "@mui/material";
import Button, { ButtonProps } from '@mui/material/Button';
import { createTheme, ThemeProvider, styled, withStyles } from "@mui/material/styles";
import { purple, red } from '@mui/material/colors';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

// TODO: 1. email 검증 로직 필요 -> 인증코드 발송 및 확인
// TODO: 2. 비밀번호 정규식 추가
interface Signup {
  codeList: [{ code: string; value: string }];
}

const MySwal = withReactContent(Swal);

const theme = createTheme({
  typography: {
    error: {
      color: 'red',
    }
  }
});
declare module '@mui/material/styles' {
  interface TypographyVariants {
    error: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    error?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    error: true;
  }
}

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

  const passwordErrorText = useRef<HTMLInputElement>(null);
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
        if(password.length == 0 && confirmPassword.length == 0 && passwordErrorText.current !== null) {
          passwordErrorText.current.style.display = "none";
        }
      }

      if (name === "confirmPassword") {
        currPassword = password;
        currConfirmPassword = value;
        if (password.length > 0 && passwordErrorText.current !== null) {
          passwordErrorText.current.style.display = "block";
        }
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
    if (email.length === 0) {
      return;
    }
    if (password.length === 0 || passwordError.length > 0) {
      return;
    }

    axiosConfig
      .post("/api/v1/user/register", {
        username: name,
        email: email,
        password: password,
      })
      .then(function (response) {
        // success
        MySwal.fire({
          icon: "success",
          title: "Success!",
          text: "Successfuly registered.",
        }).then(function(isConfirm) {
          if(isConfirm) {
            navigate("/");
          }
        });
      })
      .catch(function (error) {
        // error.response
        MySwal.fire({
          icon: "error",
          title: "Error!",
          text: error.response.data.message,
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
                <Typography variant="error" sx={{ display: "none" }} ref={passwordErrorText}>{passwordError}</Typography>
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
