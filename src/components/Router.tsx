import React from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "@pages/login/Signup";
import Signin from "@pages/login/Signin";
//import SsoLogin from "@pages/login/SsoLogin";
import Mainpage from "@components/Mainpage";
import UserList from "@pages/settings/users/UserList";
import AddUser from "@pages/settings/users/AddUser";
import EditUser from "@pages/settings/users/EditUser";
import UserProfile from "@pages/settings/users/UserProfile";
import EditUserProfile from "@pages/settings/users/EditUserProfile";
import RoleList from "@pages/settings/roles/RoleList";
import EditRole from "@pages/settings/roles/EditRole";

import Overview from "@components/Overview";
import BeforeSpecList from "@src/pages/beforespec/BeforeSpecList";
import BidNoticeList from "@src/pages/bidnotice/BidNoticeList";
import MeetUp from "@pages/meetup/MeetUp";
import BookmarkList from "@src/pages/bookmark/BookmarkList";

const Router = (props: any) => {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/login" element={ <Signin />} />
      <Route path="/users/list" element={<UserList />} />
      <Route path="/users/add" element={<AddUser />} />
      <Route path="/users/edit/:userId" element={<EditUser />} />
      <Route path="/roles/list" element={<RoleList />} />
      <Route path="/roles/edit/:role" element={<EditRole />} />
      <Route path="/users/profile/userinfo" element={<UserProfile />} />
      <Route path="/users/profile/edit" element={<EditUserProfile />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/beforespec/list" element={<BeforeSpecList />}/>
      <Route path="/bidnotice/list" element={<BidNoticeList />} />
      <Route path="/meetup/list" element={<MeetUp />}/>
      <Route path="/bookmark/list" element={<BookmarkList />} />
    </Routes>
  );
};

export default Router;
