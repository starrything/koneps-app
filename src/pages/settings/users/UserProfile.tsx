import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import ResetPasswordModal from "@pages/settings/users/ResetPasswordModal";
import { isNotEmpty } from "@utils/valid";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";

const UserProfile = (props: any) => {
  const nvigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useSelector((state: RootStateOrAny) => state.session.loginInfo);
  const [roles, setRoles] = useState("");
  const {
    loginId,
    isValid,
    firstName,
    lastName,
    tel,
    email,
    address1,
    address2,
    authorities,
  } = user;
  var regex = /[^0-9]/g;
  const [userInfo, setUserInfo] = useState({
    loginId: loginId,
    isValid: isValid,
    firstName: firstName,
    lastName: lastName,
    tel: isNotEmpty(tel) ? tel.replace(regex, "") : "",
    email: email,
    address1: address1,
    address2: address2,
  });

  const getRoles = () => {
    let roles: string = "";
    if (isNotEmpty(user)) {
      user.authorities.forEach((auth: { role: string; }) => {
        roles += auth.role + ", ";
      });
      roles = roles.substr(0, roles.length - 2);

      //return roles;
      setRoles(roles);
    }
  };

  useEffect(() => {
    // init
    getRoles();
  }, []);
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
            <Typography color="text.primary">My Profile</Typography>
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
      <Container sx={{textAlign: "left"}}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row" style={{ width: "20%" }}>
                ID
              </th>
              <td>{userInfo.loginId}</td>
            </tr>
            <tr>
              <th scope="row">Is Active?</th>
              <td>{userInfo.isValid === 1 ? "True" : "False"}</td>
            </tr>
            <tr>
              <th scope="row">Role</th>
              {/* <td>{"[" + getRoles() + "]"}</td> */}
              <td>{"[" + roles + "]"}</td>
            </tr>
          </tbody>
        </table>
      </Container>
      <Container>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="row align-items-start">
            <div className="input-group mb-3">Personal info</div>
          </div>
        </div>
      </Container>
      <Container sx={{textAlign: "left"}}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row" style={{ width: "20%" }}>
                First Name
              </th>
              <td>{userInfo.firstName}</td>
            </tr>
            <tr>
              <th scope="row">Last Name</th>
              <td>{userInfo.lastName}</td>
            </tr>
            <tr>
              <th scope="row">Tel.</th>
              <td>
                {userInfo.tel.substr(0, 3) +
                  "-" +
                  userInfo.tel.substr(3, 4) +
                  "-" +
                  userInfo.tel.substr(7, 4)}
              </td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{userInfo.email}</td>
            </tr>
            <tr>
              <th scope="row">Address1</th>
              <td>{userInfo.address1}</td>
            </tr>
            <tr>
              <th scope="row">Address2</th>
              <td>{userInfo.address2}</td>
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
              // data-bs-toggle="modal"
              // data-bs-target="#ResetPasswordModal"
              onClick={handleOpen}
            >
              Reset my password
            </button>
          </div>
          <div style={{ display: "inline-block", paddingRight: "5px" }}>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => nvigate("/user/profile/edit")}
            >
              Edit
            </button>
          </div>
        </form>
      </Container>
      {/* <!-- Modal --> */}
      <ResetPasswordModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default UserProfile;
