import React, { useState, useEffect } from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import _ from "lodash";

export const BuilderTabChart = (props) => {
  const [chartList, setChartList] = useState([]);

  useEffect(() => {
    searchChartList();
  }, []);

  function searchChartList(keyword) {
    // console.log(keyword);
    if(keyword === undefined || keyword === null) {
        keyword = "";
    }

    AxiosConfig.get("/api/chart/dashboard-component/search", {
      params: {
        keyword: keyword,
      },
    })
      .then(function (response) {
        // success
        setChartList(response.data);
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  function dragThis(event) {
    event.dataTransfer.setData("builder", event.target.id);
  }

  function drawChartCard(chart) {
    return (
      <div
        className="chart-card-container"
        draggable="true"
        style={{
          width: "100%",
          height: "112px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "center",
          padding: "0px",
          cursor: "move",
          backgroundColor: "white",
        }}
        id={chart.chartId + "_" + chart.chartType}
        onDragStart={dragThis}
      >
        <div
          className="chart-card"
          style={{
            width: "100%",
            border: "1px solid #cfd8dc",
            padding: "8px",
            margin: "0 8px 8px 8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="card-title"
            style={{ fontSize: "14px", fontWeight: "700", display: "block" }}
          >
            {chart.chartTitle}
          </div>
          <div
            className="card-body"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0px",
            }}
          >
            <div className="item" style={{ fontSize: "14px" }}>
              Modified {chart.modifiedFrom} ago
            </div>
            <div className="item" style={{ fontSize: "14px" }}>
              Visualization {chart.chartType}
            </div>
            <div className="item" style={{ fontSize: "14px" }}>
              Datasource {chart.datasource}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="tab-pane fade"
      id="chartTab"
      role="tabpanel"
      aria-labelledby="chart-tab"
    >
      <div
        style={{
          padding: "5px",
          display: props.displayTab === "chart" ? "block" : "none",
        }}
      >
        <div className="controls" style={{ display: "flex", padding: "16px" }}>
          <input
            type="text"
            placeholder="Filter your charts"
            onChange={(e) => searchChartList(e.target.value)}
          />
        </div>
        <div
          className="chart-card-list"
          style={{ height: "calc(100vh - 250px)", overflowY: "scroll" }}
        >
          {_.map(chartList, (el) => drawChartCard(el))}
        </div>
      </div>
    </div>
  );
};
