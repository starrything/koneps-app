import React, { useState, useEffect, useRef } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "~/modules/login/user";
import * as actionOfGlobal from "~/modules/global/actionOfGlobal";
import AxiosConfig from "~/utils/AxiosConfig";
import { isEmpty, SynchroniseSession } from "~/utils/Valid";

import Signup from "~/pages/login/Signup";
import Login from "~/pages/login/Login";
import SsoLogin from "~/pages/login/SsoLogin";
import Gnb from "~/components/Gnb";
import Main from "~/components/Main";
import Database from "~/pages/data/database/Database";
import Dataset from "~/pages/data/dataset/Dataset";
import Chart from "~/pages/chart/Chart";
import AddChart from "~/pages/chart/AddChart";
import MakeChart from "~/pages/chart/make-chart/MakeChart";
import Dashboard from "~/pages/dashboards/Dashboard";
import AddDashboard from "~/pages/dashboards/AddDashboard";
import DashboardView from "~/pages/dashboards/DashboardView";
import DashboardEdit from "~/pages/dashboards/DashboardEdit";
import IfDashboard from "~/pages/dashboards/interface/IfDashboardView";
import UserList from "~/pages/settings/users/UserList";
import AddUser from "~/pages/settings/users/AddUser";
import EditUser from "~/pages/settings/users/EditUser";
import RoleList from "~/pages/settings/roles/RoleList";
import EditRole from "~/pages/settings/roles/EditRole";
import UserProfile from "~/pages/settings/users/UserProfile";
import EditUserProfile from "~/pages/settings/users/EditUserProfile";

import Overview from "~/components/Overview";
import BidNotice from "~/pages/data/bidnotice/BidNotice";
import BeforeSpec from "~/pages/data/beforespec/BeforeSpec";
import MeetUp from "~/pages/meetup/MeetUp";
import Links from "~/pages/links/Links";

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
      <Gnb />
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
        <Route path="/overview" component={Overview} />
        <Route path="/bidnotice/list" component={BidNotice} />
        <Route path="/beforespec/list" component={BeforeSpec} />
        <Route path="/meetup/list" component={MeetUp} />
        <Route path="/links/list" component={Links} />
        <Route path="/signup" component={Signup} />
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
