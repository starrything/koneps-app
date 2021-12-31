import React, { useState, useEffect, useRef } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Signup from "~/pages/login/Signup";
import Login from "~/pages/login/Login";
import SsoLogin from "~/pages/login/SsoLogin";
import Gnb from "~/components/Gnb";
import Main from "~/components/Main";

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

  return (
    <div className="App">
      <Gnb />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact strict path="/login" component={Login} />
        <Route path="/users/list" component={UserList} />
        <Route path="/users/add" component={AddUser} />
        <Route path="/users/edit/:userId" component={EditUser} />
        <Route path="/roles/list" component={RoleList} />
        <Route path="/roles/edit/:role" component={EditRole} />
        <Route path="/users/profile/userinfo" component={UserProfile} />
        <Route path="/users/profile/edit" component={EditUserProfile} />
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

export default App;
