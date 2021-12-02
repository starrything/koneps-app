import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetDashboard } from "~/modules/index";
import * as actions from "~/modules/dashboard/actionOfDashboard";
import DashboardHeader from "./dashboard-add/DashboardHeader";
import DashboardContent from "./dashboard-add/DashboardContent";

const AddDashboard = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Anything in here is fired on component mount.    
    dispatch(actions.setDashboardMode("edit"));
    return () => {
        // Anything in here is fired on component unmount.
        dispatch(resetDashboard());
    }
}, [])
  return (
    <div>
      <DashboardHeader />
      <DashboardContent />
    </div>
  );
};

export default AddDashboard;
