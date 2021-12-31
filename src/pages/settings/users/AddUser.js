import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AxiosConfig from "~/utils/AxiosConfig";
import AsyncSelect from "react-select/async";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AddUser = (props) => {
  let history = useHistory();
  const [userinfo, setUserinfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    isActive: false,
    tel: "",
    email: "",
    address1: "",
    address2: "",
    roles: [],
    password: "",
    confirmPassword: "",
  });
  const {
    firstName,
    lastName,
    username,
    isActive,
    tel,
    email,
    address1,
    address2,
    roles,
    password,
    confirmPassword,
  } = userinfo;
  let roleCodeList = useSelector(
    (state) => state.actionOfCode.roleCodeList
  );
  const [roleList, setRoleList] = useState(roleCodeList);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    //
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let formValue = value;

    if (name === "isActive") {
      formValue = value === "false" ? true : false;
    }

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

  const addNewUser = () => {
    var regex = /[^0-9]/g;

    if (firstName.length === 0) {
      return;
    }
    if (lastName.length === 0) {
      return;
    }
    if (username.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }
    if (password.length === 0 || passwordError.length > 0) {
      return;
    }
    let selectedRoles = [];
    selectedRoles = roles.length === 0 ? ["USER"] : roles.map((e) => e.value);

    let convertIsActive = isActive === false ? 0 : 1;

    AxiosConfig.post("/api/user", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      isActive: convertIsActive,
      tel: tel.replace(regex, ""),
      email: email,
      roles: selectedRoles,
      address1: address1,
      address2: address2,
      password: password,
    })
      .then(function (response) {
        // success
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
          text: "Failed to create the user information.",
        });
      })
      .then(function () {
        // finally
      });
  };

  const filterRoles = (inputValue) => {
    return roleList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const promiseRoleOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterRoles(inputValue));
      }, 1000);
    });
  const handleInputChangeRoleOptions = (selectedOption) => {
    if (selectedOption.length > 0) {
      let values = [];
      selectedOption.forEach((el, key) => {
        let set = { key: key, value: el["value"] };
        values.push(set);
      });

      setRoleList(selectedOption);
      const nextUserinfo = {
        //스프레드 문법으로 기존의 객체를 복사한다.
        ...userinfo,
        ["roles"]: selectedOption,
      };
      //만든 변수를 seInput으로 변경해준다.
      setUserinfo(nextUserinfo);
    } else {
      let values = [];

      setRoleList(values);
      const nextUserinfo = {
        //스프레드 문법으로 기존의 객체를 복사한다.
        ...userinfo,
        ["roles"]: values,
      };
      //만든 변수를 seInput으로 변경해준다.
      setUserinfo(nextUserinfo);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="row align-items-start">
            <div className="input-group">Add User</div>
          </div>
        </div>
      </div>
      <div className="container">
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th scope="row" style={{ width: "20%" }}>
                First Name<font style={{ color: "red" }}>*</font>
              </th>
              <td>
                <input
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                Last Name<font style={{ color: "red" }}>*</font>
              </th>
              <td>
                <input
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                User Name<font style={{ color: "red" }}>*</font>
              </th>
              <td>
                <input
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="User Name"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Is Active?</th>
              <td>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={isActive}
                  name="isActive"
                  id="isActive"
                  onChange={handleInputChange}
                ></input>
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
                  placeholder="Tel."
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                Email<font style={{ color: "red" }}>*</font>
              </th>
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
              <th scope="row">Role</th>
              <td>
                <AsyncSelect
                  isMulti
                  cacheOptions
                  defaultOptions
                  placeholder={"choose one or more"}
                  loadOptions={promiseRoleOptions}
                  onChange={handleInputChangeRoleOptions}
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
                  placeholder="Address1"
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
                  placeholder="Address2"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                Password<font style={{ color: "red" }}>*</font>
              </th>
              <td>
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Confirm Password</th>
              <td>
                <input
                  className="form-control"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                />
                <font style={{ color: "red" }}>{passwordError}</font>
              </td>
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
              onClick={addNewUser}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
