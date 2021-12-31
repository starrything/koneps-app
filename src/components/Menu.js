import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetStore } from "~/modules/index";
import AxiosConfig from "~/utils/AxiosConfig";
import * as actions from "~/modules/login/user";
import * as actionOfGlobal from "~/modules/global/actionOfGlobal";
import Swal from "sweetalert2";
import _ from "lodash";
import withReactContent from "sweetalert2-react-content";
import "bootstrap-icons/font/bootstrap-icons.css";
import { isNotEmpty } from "~/utils/Valid";

const MySwal = withReactContent(Swal);
const Menu = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dashboardMode = useSelector(
    (state) => state.actionOfDashboard.dashboardMode
  );
  const timeInterval = useSelector(
    (state) => state.actionOfGlobal.timeInterval
  );
  const currentTimer = useSelector((state) => state.actionOfGlobal.timer);
  const [timeIntervalList, setTimeIntervalList] = useState([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    getTimeIntervalList();
  }, []);
  useEffect(() => {
    if (isNotEmpty(timeInterval)) {
      let timeIntervalValue = timeInterval.substr(0, timeInterval.length - 1);
      let timeIntervalUnit = timeInterval.substr(timeInterval.length - 1);
      let interval = 0;
      if (timeIntervalUnit === "s") {
        interval = Number(timeIntervalValue) * 1000;
      } else if (timeIntervalUnit === "m") {
        interval = Number(timeIntervalValue) * 1000 * 60;
      } else if (timeIntervalUnit === "h") {
        interval = Number(timeIntervalValue) * 1000 * 60 * 60;
      } else if (timeIntervalUnit === "d") {
        interval = Number(timeIntervalValue) * 1000 * 60 * 60 * 24;
      }
      let counter = 0;
      const timerId = setInterval(() => {
        // do something ...
        console.log("Time Interval : " + timeInterval + " - " + counter);
        counter++;
        setTimer(counter);
        dispatch(actionOfGlobal.setTimer(counter));
      }, interval);

      return () => clearTimeout(timerId);
    }
  }, [timeInterval]);

  const getTimeIntervalList = () => {
    AxiosConfig.get("/api/code", {
      params: {
        code: "TIME_INTERVAL",
      },
    })
      .then(function (response) {
        // success
        let codeOptions = [];
        response.data.forEach((element) => {
          codeOptions.push({
            code: element["code"],
            value: element["value"],
          });
        });
        setTimeIntervalList(codeOptions);
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };

  const userList = () => {
    dispatch(resetStore());
    history.push("/users/list");
  };
  const roleList = () => {
    dispatch(resetStore());
    history.push("/roles/list");
  };

  const userinfo = () => {
    dispatch(resetStore());
    history.push("/users/profile/userinfo");
  };

  const logout = () => {
    AxiosConfig.get("/logout")
      .then(function (response) {
        // success
        dispatch(actions.setLoginInfo({})); // initiate redux store
        global.localStorage.removeItem("loginInfo"); // remove localstorage item by key
        global.localStorage.clear(); // clear localstorage
        history.push("/login");
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };
  const hideGnb = () => {
    //swal
    MySwal.fire({
      icon: "warning",
      text: "Press ESC for return.",
    });

    dispatch(actionOfGlobal.setGnbMode("hidden"));
  };
  const setTimeInterval = (v) => {
    if (v === "off") {
      v = "";
    }
    dispatch(actionOfGlobal.setTimeInterval(v));
  };
  const createTimeIntervalList = (el) => {
    return (
      <li style={{ textAlign: "center" }}>
        <button
          className="dropdown-item"
          type="button"
          onClick={() => setTimeInterval(el.code)}
        >
          {el.value}
        </button>
      </li>
    );
  };
  const refreshDashboard = () => {
    let nextTimer = currentTimer;
    dispatch(actionOfGlobal.setTimer(nextTimer + 1));
  };
  return (
    <div className="collapse navbar-collapse" id="navbarsExample03">
      <ul className="navbar-nav me-auto mb-2 mb-sm-0">
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle active"
            to="#"
            id="dropdown03"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Data
          </Link>
          <ul className="dropdown-menu" aria-labelledby="dropdown03">
            <li>
              <Link to="/data/database/list" className="nav-link active">
                DataBase
              </Link>
            </li>
            <li>
              <Link to="/data/dataset/list" className="nav-link active">
                Dataset
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link
            to="/chart/list"
            className="nav-link active"
            onClick={() => dispatch(resetStore())}
          >
            Charts
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/dashboard/list"
            className="nav-link active"
            onClick={() => dispatch(resetStore())}
          >
            Dashboards
          </Link>
        </li>
      </ul>
      <div
        className="d-flex"
        style={{ display: dashboardMode === "view" ? "block" : "none" }}
      >
        <div
          style={{
            display: dashboardMode === "view" ? "inline-block" : "none",
            paddingRight: "5px",
          }}
        >
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{ padding: "3px 9px 3px 9px" }}
            onClick={() => hideGnb()}
          >
            <i className="bi bi-arrows-collapse" alt="collapse"></i>
          </button>
        </div>
        <div
          style={{
            display: dashboardMode === "view" ? "inline-block" : "none",
            paddingRight: "5px",
          }}
        >
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{ padding: "3px 9px 3px 9px" }}
            onClick={refreshDashboard}
          >
            <i className="bi bi-arrow-repeat"></i>
          </button>
        </div>
        <div
          style={{
            display: dashboardMode === "view" ? "inline-block" : "none",
            paddingRight: "5px",
          }}
        >
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="timeInterval"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ padding: "3px 9px 3px 9px" }}
            >
              {timeInterval}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="timeInterval"
              style={{ minWidth: "60px" }}
            >
              {_.map(timeIntervalList, (el) => createTimeIntervalList(el))}
            </ul>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle active"
              to="#"
              id="dropdown03"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              settings
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdown03"
            >
              <li>
                <h6 className="dropdown-header">Security</h6>
              </li>
              <li>
                <Link
                  to="#"
                  className="nav-link active"
                  style={{ paddingLeft: "24px" }}
                  onClick={userList}
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="nav-link active"
                  style={{ paddingLeft: "24px" }}
                  onClick={roleList}
                >
                  Roles
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <h6 className="dropdown-header">User</h6>
              </li>
              <li>
                <Link
                  to="#"
                  className="nav-link active"
                  style={{ paddingLeft: "24px" }}
                  onClick={userinfo}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="nav-link active"
                  style={{ paddingLeft: "24px" }}
                  onClick={logout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
