import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DashboardContentGridContainer from "./DashboardContentGridContainer";
import DashboardContentBuilderPanel from "./DashboardContentBuilderPanel";

const DashboardContent = (props) => {
  const gnbView = useSelector(
    (state) => state.actionOfGlobal.gnbView
  );
  const dashboardMode = useSelector(
    (state) => state.actionOfDashboard.dashboardMode
  );
  const dashboardId = useSelector(
    (state) => state.actionOfDashboard.dashboardId
  );
  const [contentHeight, setContentHeight] = useState("");
  useEffect(() => {
    let gnbNavbarHeight = gnbView === "show" ? 56 : 0; //document.getElementById("gnbNavbarComponent").clientHeight
    let dashboardHeaderBox = document.getElementById("dashboardHeaderBox").clientHeight;
    let height = window.innerHeight - gnbNavbarHeight - dashboardHeaderBox;

    // console.log(height);
    setContentHeight(height);
  });

  let gridContainer;
  let builderPanel;
  if (dashboardMode === "edit") {
    gridContainer = <DashboardContentGridContainer dashboardId={dashboardId} dashboardMode={dashboardMode} />
    builderPanel = <DashboardContentBuilderPanel />;
  } else if (dashboardMode === "view") {
    gridContainer = <DashboardContentGridContainer dashboardId={dashboardId} dashboardMode={dashboardMode} />
    builderPanel = "";
  }
  return (
    <div
      className="dashboard-content bg-light"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        height: contentHeight,
      }}
    >
      {gridContainer}
      {builderPanel}
    </div>
  );
};

export default DashboardContent;
