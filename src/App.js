import React, { useState, useEffect, useRef } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "~/modules/login/user";
import * as actionOfGlobal from "~/modules/global/actionOfGlobal";
import AxiosConfig from "~/AxiosConfig";
import { isEmpty, SynchroniseSession } from "~/components/Utils";

import Login from "~/app/Login";
import SsoLogin from "~/app/SsoLogin";
import Gnb from "~/app/Gnb";
import Main from "~/app/Main";
import Database from "~/components/data/database/Database";
import Dataset from "~/components/data/dataset/Dataset";
import Chart from "~/components/chart/Chart";
import AddChart from "~/components/chart/AddChart";
import MakeChart from "~/components/chart/make-chart/MakeChart";
import Dashboard from "~/components/dashboards/Dashboard";
import AddDashboard from "~/components/dashboards/AddDashboard";
import DashboardView from "~/components/dashboards/DashboardView";
import DashboardEdit from "~/components/dashboards/DashboardEdit";
import IfDashboard from "~/components/dashboards/interface/IfDashboardView";
import UserList from "~/components/settings/users/UserList";
import AddUser from "~/components/settings/users/AddUser";
import EditUser from "~/components/settings/users/EditUser";
import RoleList from "~/components/settings/roles/RoleList";
import EditRole from "~/components/settings/roles/EditRole";
import UserProfile from "~/components/settings/users/UserProfile";
import EditUserProfile from "~/components/settings/users/EditUserProfile";

const App = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const storedLoginInfo = useSelector((state) => state.user.loginInfo); //redux store
  useEffect(() => {
    // session check
    // 1. get session info
    // let browserLoginInfo = {};
    // if (global.localStorage) {
    //   // Browser Local storage
    //   browserLoginInfo =
    //     JSON.parse(global.localStorage.getItem("loginInfo")) || {};

    //   if (Object.keys(storedLoginInfo).length === 0) {
    //     // redux store
    //     dispatch(actions.setLoginInfo(browserLoginInfo));
    //   } else {
    //     if (storedLoginInfo.token.length === 0) {
    //       AxiosConfig.get("/logout")
    //         .then(function (response) {
    //           // success
    //           dispatch(actions.setLoginInfo({})); // initiate redux store
    //           global.localStorage.removeItem("loginInfo"); // remove localstorage item by key
    //           global.localStorage.clear(); // clear localstorage
    //           history.push("/login");
    //         })
    //         .catch(function (error) {
    //           // error
    //         })
    //         .then(function () {
    //           // finally
    //         });
    //     }
    //   }
    // }

    // // 2. Check the request token
    // let token = browserLoginInfo.token;
    // if (isEmpty(token)) {
    //   history.push("/login");
    //   AxiosConfig.defaults.headers["x-auth-token"] = "";
    // } else {
    //   AxiosConfig.defaults.headers["x-auth-token"] = token;
    // }
  }, []);

  useEffect(() => {
    function onKeyup(e) {
      if(e.key === "Escape") {
        dispatch(actionOfGlobal.setGnbMode("show"));
      }
    }
    window.addEventListener('keyup', onKeyup);
  });

  return (
    <div className="App">
      {/* <Gnb /> */}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact strict path="/login" component={Login} />
        <Route path="/data/database/list" component={Database} />
        <Route path="/data/dataset/list" component={Dataset} />
        <Route path="/chart/list" component={Chart} />
        <Route path="/chart/add" component={AddChart} />
        <Route path="/chart/make" component={MakeChart} />
        <Route path="/dashboard/list" component={Dashboard} />
        <Route path="/dashboard/add" component={AddDashboard} />
        <Route path="/dashboard/view/:dashboardId" component={DashboardView} />
        <Route path="/dashboard/edit/:dashboardId" component={DashboardEdit} />
        <Route
          exact
          strict
          path="/sso-login/:username/:token"
          component={SsoLogin}
        />
        <Route
          exact
          strict
          path="/interface/dashboard-view/:username/:token/:dashboardId"
          component={IfDashboard}
        />
        <Route path="/users/list" component={UserList} />
        <Route path="/users/add" component={AddUser} />
        <Route path="/users/edit/:userId" component={EditUser} />
        <Route path="/roles/list" component={RoleList} />
        <Route path="/roles/edit/:role" component={EditRole} />
        <Route path="/users/profile/userinfo" component={UserProfile} />
        <Route path="/users/profile/edit" component={EditUserProfile} />
        {/* <Route path={`/chart/make/:chartId`} component={MakeChart} /> */}
        {/* <Route path="/chart/make/:chartId" render={(props) => <MakeChart {...props}/>} /> */}
      </Switch>
    </div>
  );
};

//export default App;
const mapStateToProps = (state) => ({
  loginInfo: state.user.loginInfo,
  gnbView: state.actionOfGlobal.gnbView,
});

const mapDispatchToProps = (dispatch) => ({
  setLoginInfo: (data) => dispatch(actions.setLoginInfo(data)),
});

export default App;
