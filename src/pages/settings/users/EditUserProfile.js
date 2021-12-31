import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AxiosConfig from "~/utils/AxiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const EditUserProfile = (props) => {
  const history = useHistory();
  const user = useSelector((state) => state.user.loginInfo);

  const [userinfo, setUserinfo] = useState({
    firstName: "",
    lastName: "",
    tel: "",
    email: "",
    address1: "",
    address2: "",
  });
  const { firstName, lastName, tel, email, address1, address2 } = userinfo;

  useEffect(() => {
    // init
    let map = {};
    map["firstName"] = user.firstName;
    map["lastName"] = user.lastName;
    map["tel"] = user.tel;
    map["email"] = user.email;
    map["address1"] = user.address1;
    map["address2"] = user.address2;
    setUserinfo(map);
  }, []);

  const handleInputChange = (event) => {
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

    AxiosConfig.put("/api/user/update", {
      firstName: firstName,
      lastName: lastName,
      tel: tel.replace(regex, ""),
      email: email,
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
      <nav
        className="navbar navbar-expand-sm navbar-light bg-white shadow-sm"
        aria-label="Third navbar example"
      >
        <div className="container-fluid">
          <Link to="#" className="navbar-brand">
            Edit user information
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
        <table class="table table-bordered">
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
              onClick={saveUserInfo}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;
