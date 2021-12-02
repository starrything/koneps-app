import React, { useState, useEffect } from "react";
import BuilderTabContent from "./dashboard-tab/BuilderTabContent";

const DashboardContentBuilderPanel = (props) => {
  const [displayTab, setDisplayTab] = useState("component");

  function dragThis(event) {
    event.dataTransfer.setData("builder", event.target.id);
  }
  return (
    <div
      className="dashboard-builder-sidepanel"
      style={{
        flex: "0 0 374px",
        position: "relative",
        //display: "block",
        height: "calc(100vh - 130px)",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <div
          className="dashboard-builder-component-panel-tabs"
          style={{
            width: "374px",
            height: "100%",
            position: "absolute",
            transform: "none !important",
            overflow: "hidden",
            boxShadow: "-4px 0 4px 0 rgb(0, 0, 0, .1)",
            //display: "block",
          }}
        >
          {/* Now... this is Tab area */}
          <div style={{ width: "100%", padding: "4px" }}>
            {/* Tab button Group */}
            <ul
              className="nav nav-tabs row"
              id="dashboardBuilderTabGroup"
              role="tablist"
              style={{ margin: 0, marginBottom: "10px" }}
            >
              <li
                className="nav-item col-6"
                role="presentation"
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                <button
                  className="nav-link active"
                  id="dashboardComponentTab"
                  data-bs-toggle="tab"
                  data-bs-target="#componentTab"
                  type="button"
                  role="tab"
                  aria-controls="componentTab"
                  aria-selected="true"
                  style={{ width: "100%" }}
                  onClick={() => setDisplayTab("component")}
                >
                  Components
                </button>
              </li>
              <li
                className="nav-item col-6"
                role="presentation"
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                <button
                  className="nav-link"
                  id="dashboardChartTab"
                  data-bs-toggle="tab"
                  data-bs-target="#chartTab"
                  type="button"
                  role="tab"
                  aria-controls="chartTab"
                  aria-selected="false"
                  style={{ width: "100%" }}
                  onClick={() => setDisplayTab("chart")}
                >
                  Charts
                </button>
              </li>
            </ul>
            <BuilderTabContent displayTab={displayTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContentBuilderPanel;
