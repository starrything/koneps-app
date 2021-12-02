import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetStore, resetDashboard } from "~/modules/index";
import * as actions from "~/modules/dashboard/actionOfDashboard";
import DashboardHeader from "./dashboard-add/DashboardHeader";
import DashboardContent from "./dashboard-add/DashboardContent";

const DashboardView = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Anything in here is fired on component mount.
    dispatch(actions.setDashboardMode("view"));
    // return () => {
    //   // Anything in here is fired on component unmount.
    //   dispatch(resetStore());
    // };
  }, []);

  let { dashboardId } = useParams();
  dispatch(actions.setDashboardId(dashboardId));
  // console.log(dashboardId);
  return (
    <div>
      <DashboardHeader />
      <DashboardContent />
    </div>
  );
};

export default DashboardView;
