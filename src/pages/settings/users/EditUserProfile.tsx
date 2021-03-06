import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import * as session from "@modules/user/session";
import axiosConfig from "@utils/axiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";

const MySwal = withReactContent(Swal);

interface userinfo {
  loginId: string,
  firstName: string,
  lastName: string,
  tel: string,
  email: string,
  address1: string,
  address2: string,
}
const EditUserProfile = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginInfo = useSelector((state: RootStateOrAny) => state.session.loginInfo);

  const [userinfo, setUserinfo] = useState<userinfo>({
    loginId: loginInfo.loginId,
    firstName: loginInfo.firstName,
    lastName: loginInfo.lastName,
    tel: loginInfo.tel,
    email: loginInfo.email,
    address1: loginInfo.address1,
    address2: loginInfo.address2,
  });
  const { firstName, lastName, tel, email, address1, address2 } = userinfo;

  useEffect(() => {
  }, []);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    let formValue = value;

    if (name === "tel") {
      var regex = /[^0-9]/g;
      let temp = "";
      temp = value.replace(regex, "");
      if (temp.length > 3) {
        formValue = temp.substr(0, 3);
      }
      if (temp.length > 3 && temp.length < 8) {
        formValue = temp.substr(0, 3) + "-" + temp.substr(3, 4);
      }
      if (temp.length > 7) {
        formValue =
          temp.substr(0, 3) + "-" + temp.substr(3, 4) + "-" + temp.substr(7, 4);
      }
      //console.log("tel. length: " + formValue.replace(regex, "").length);
    }
    const nextUserinfo = {
      //스프레드 문법으로 기존의 객체를 복사한다.
      ...userinfo,
      [name]: formValue,
    };
    //만든 변수를 seInput으로 변경해준다.
    setUserinfo(nextUserinfo);
  };

  const saveUserInfo = () => {
    var regex = /[^0-9]/g;

    axiosConfig.put("/api/v1/user/update", {
      firstName: firstName,
      lastName: lastName,
      tel: tel.replace(regex, ""),
      email: email,
      address1: address1,
      address2: address2,
    })
      .then(function (response) {
        // success
        // 1. redux store
        loginInfo.firstName = firstName;
        loginInfo.lastName = lastName;
        loginInfo.tel = tel;
        loginInfo.email = email;
        loginInfo.address1 = address1;
        loginInfo.address2 = address2;
        dispatch(session.setLoginInfo(loginInfo));

        // 2. browser Local storage
        global.localStorage.setItem(
          "loginInfo",
          JSON.stringify(loginInfo)
        );

        MySwal.fire({
          icon: "success",
          text: "Success!",
        });
      })
      .catch(function (error) {
        // error
        //alert("Failed to save this Dataset.");
        MySwal.fire({
          icon: "error",
          text: "Failed to update the user information.",
        });
      })
      .then(function () {
        // finally
      });
  };

  return (
    <Box sx={{ pt: 8.5 }}>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-white shadow-sm"
        aria-label="Third navbar example"
      >
        <div className="container-fluid">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              KONEPS
            </Link>
            <Typography color="text.primary">Edit My Profile</Typography>
          </Breadcrumbs>
          <div className="collapse navbar-collapse" id="navbarsExample03">
            <ul className="navbar-nav me-auto mb-2 mb-sm-0"></ul>
            <form className="d-flex">
            </form>
          </div>
        </div>
      </nav>
      <Container>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="row align-items-start">
            <div className="input-group mb-3">User info</div>
          </div>
        </div>
      </Container>
      <Container>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row" style={{ width: "20%" }}>
                First Name
              </th>
              <td>
                <input
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Last Name</th>
              <td>
                <input
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Tel.</th>
              <td>
                <input
                  type="tel"
                  className="form-control"
                  name="tel"
                  value={tel}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Address1</th>
              <td>
                <input
                  className="form-control"
                  name="address1"
                  value={address1}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Address2</th>
              <td>
                <input
                  className="form-control"
                  name="address2"
                  value={address2}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
      <Container>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"></div>
      </Container>
      <Container>
        <form className="d-flex">
          <div style={{ display: "inline-block", paddingRight: "5px" }}>
            <button
              className="btn btn-success"
              type="button"
              onClick={saveUserInfo}
            >
              Save
            </button>
          </div>
        </form>
      </Container>
    </Box>
  );
};

export default EditUserProfile;
