import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import ResetPasswordModal from "@pages/settings/users/ResetPasswordModal";
import { isNotEmpty } from "@utils/valid";

const UserProfile = (props: any) => {
  const nvigate = useNavigate();
  const user = useSelector((state: RootStateOrAny) => state.user.loginInfo);
  const [roles, setRoles] = useState("");
  const {
    loginId,
    isActive,
    firstName,
    lastName,
    tel,
    email,
    address1,
    address2,
  } = user;
  var regex = /[^0-9]/g;
  const [userInfo, setUserInfo] = useState({
    loginId: loginId,
    isActive: isActive,
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
    <div>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-white shadow-sm"
        aria-label="Third navbar example"
      >
        <div className="container-fluid">
          <Link to="#" className="navbar-brand">
            Your user information
          </Link>
          <div className="collapse navbar-collapse" id="navbarsExample03">
            <ul className="navbar-nav me-auto mb-2 mb-sm-0"></ul>
            <form className="d-flex"></form>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="row align-items-start">
            <div className="input-group mb-3">User info</div>
          </div>
        </div>
      </div>
      <div className="container">
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
              <td>{userInfo.isActive === 1 ? "True" : "False"}</td>
            </tr>
            <tr>
              <th scope="row">Role</th>
              {/* <td>{"[" + getRoles() + "]"}</td> */}
              <td>{"[" + roles + "]"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="row align-items-start">
            <div className="input-group mb-3">Personal info</div>
          </div>
        </div>
      </div>
      <div className="container">
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
      </div>
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"></div>
      </div>
      <div className="container">
        <form className="d-flex">
          <div style={{ display: "inline-block", paddingRight: "5px" }}>
            <button
              className="btn btn-success"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#ResetPasswordModal"
            >
              Reset my password
            </button>
          </div>
          <div style={{ display: "inline-block", paddingRight: "5px" }}>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => nvigate("/users/profile/edit")}
            >
              Edit user
            </button>
          </div>
        </form>
      </div>
      {/* <!-- Modal --> */}
      <ResetPasswordModal />
    </div>
  );
};

export default UserProfile;
