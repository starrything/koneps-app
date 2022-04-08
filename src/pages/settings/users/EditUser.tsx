import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import axiosConfig from "@utils/axiosConfig";
import AsyncSelect from "react-select/async";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface userinfo {
  firstName: string,
  lastName: string,
  username: any,
  isActive: Boolean,
  tel: string,
  email: string,
  address1: string,
  address2: string,
  roles: any,
  password: string,
  confirmPassword: string,
}
const EditUser = (props: any) => {
  let navigate = useNavigate();
  let { userId } = useParams();
  const [userinfo, setUserinfo] = useState<userinfo>({
    firstName: "",
    lastName: "",
    username: userId,
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
  let roleCodeList = useSelector((state: RootStateOrAny) => state.actionOfSettings.roleCodeList);
  const [roleList, setRoleList] = useState(roleCodeList);
  const [passwordError, setPasswordError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    //let { username } = useParams();
    console.log("Edit user: " + userId);
    getUserDetails(userId);

    if (!isActive) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  }, []);

  const getUserDetails = (userId: any) => {
    axiosConfig.get("/api/user/detail", {
      params: {
        username: userId,
      },
    })
      .then(function (response) {
        // success
        const userDetail = response.data;
        let isActiveData = userDetail.isActive;
        if (isActiveData === 0) {
          setIsChecked(false);
        } else {
          setIsChecked(true);
        }
        let roleOptions: { value: string; label: string; }[] = [];
        let rolesData = userDetail.roles;
        rolesData.forEach((e: any) => {
          roleOptions.push({
            value: e,
            label: e,
          });
        });
        setRoleList(roleOptions);

        var regex = /[^0-9]/g;
        let telData = userDetail.tel.replace(regex, "");

        const nextUserinfo = {
          //스프레드 문법으로 기존의 객체를 복사한다.
          ...userinfo,
          firstName: userDetail.firstName,
          lastName: userDetail.lastName,
          username: userId,
          isActive: userDetail.isActive === 0 ? false : true,
          tel: telData.substr(0, 3) + "-" + telData.substr(3, 4) + "-" + telData.substr(7, 4),
          email: userDetail.email,
          roles: roleOptions,
          address1: userDetail.address1,
          address2: userDetail.address2,
        };
        //만든 변수를 seInput으로 변경해준다.
        setUserinfo(nextUserinfo);
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    let formValue = value;

    if (name === "isActive") {
      formValue = value === "false" ? true : false;
      if (value === "false") {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
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

  const filterRoles = (inputValue: string) => {
    return roleList.filter((i: { label: string; }) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const promiseRoleOptions = (inputValue: string) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterRoles(inputValue));
      }, 1000);
    });
  const handleInputChangeRoleOptions = (selectedOption: any) => {
    let values: { key: any; value: string; }[] = [];
    if (selectedOption.length > 0) {      
      selectedOption.forEach((el: { [x: string]: string; }, key: any) => {
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

  const editUser = () => {
    var regex = /[^0-9]/g;

    if (firstName.length === 0) {
      return;
    }
    if (lastName.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }
    let selectedRoles = [];
    selectedRoles = roles.length === 0 ? ["USER"] : roles;

    let convertIsActive = isActive === false ? 0 : 1;

    axiosConfig.put("/api/user", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      isActive: convertIsActive,
      tel: tel.replace(regex, ""),
      email: email,
      roles: selectedRoles,
      address1: address1,
      address2: address2,
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
          text: "Failed to update the user information.",
        });
      })
      .then(function () {
        // finally
      });
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="row align-items-start">
            <div className="input-group">Edit User</div>
          </div>
        </div>
      </div>
      <div className="container">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row" style={{ width: "20%" }}>
                First Name<span style={{ color: "red" }}>*</span>
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
                Last Name<span style={{ color: "red" }}>*</span>
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
              <th scope="row">Is Active?</th>
              <td>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isChecked}
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
                Email<span style={{ color: "red" }}>*</span>
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
                  value={roles}
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
              onClick={editUser}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
