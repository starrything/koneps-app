import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AxiosConfig from "~/utils/AxiosConfig";
import * as actions from "~/modules/dashboard/actionOfDashboard";
import _ from "lodash";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import RGL, { WidthProvider } from "react-grid-layout";
import "./dashboard-component-style.css";
import DashboardChartView from "./dashboard-chart/DashboardChartView";

const ReactGridLayout = WidthProvider(RGL);
const DashboardContentGridContainer = (props) => {
  const dispatch = useDispatch();
  const dashboardId = props.dashboardId;
  // const dashboardId = useSelector(
  //   (state) => state.actionOfDashboard.dashboardId
  // );
  let currGridItemCount = useSelector(
    (state) => state.actionOfDashboard.currGridItemCount
  );
  let currCompHeaders = useSelector(
    (state) => state.actionOfDashboard.currCompHeaders
  );
  let currGridItemList = useSelector(
    (state) => state.actionOfDashboard.currGridItemList
  );
  let removeStyle = useSelector((state) => state.actionOfDashboard.removeStyle);
  const originalLayout = getFromLS("layout") || {};

  const [gridItemCount, setGridItemCount] = useState(0);
  const [gridItems, setGridItems] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [layout, setLayout] = useState(
    JSON.parse(JSON.stringify(originalLayout))
  );
  const [rglDraggable, setRglDraggable] = useState(true);

  // const dashboardMode = useSelector(
  //   (state) => state.actionOfDashboard.dashboardMode
  // );
  const dashboardMode = props.dashboardMode;

  useEffect(() => {
    if (isNotEmpty(dashboardId) && dashboardMode === "view") {
      // set grid items
      dispatch(actions.setRemoveStyle({ display: "none" }));
      setRglDraggable(false);
      console.log("DashboardContentGridContainer.js -----");
      console.log("setRglDraggable(false)");
      setGridItemsByDashboardId(dashboardId);
    } else if (isNotEmpty(dashboardId) && dashboardMode === "edit") {
      setGridItemCount(currGridItemCount);
      setHeaders(currCompHeaders);
      setGridItems(currGridItemList);
    }
  }, []);

  let clickCount = useSelector((state) => state.actionOfFilterBox.clickCount);
  useEffect(() => {
    console.log("we need reload!! (count: " + clickCount + ")");
    currGridItemList.forEach((el) => {
      el["filteredCount"] = clickCount;
    });
    setGridItems(currGridItemList);
  }, [clickCount]);

  function isNotEmpty(str) {
    if (typeof str === "undefined" || str === null || str === "") return false;
    else return true;
  }

  function setGridItemsByDashboardId(dashboardId) {
    AxiosConfig.get("/api/dashboard/" + dashboardId)
      .then(function (response) {
        // success
        setGridItemCount(response.data.count);
        dispatch(actions.setGridItemCount(response.data.count));

        let componentList = response.data.component;
        let chartList = response.data.chart;

        let gridItemList = [];

        let compHeaders = [];
        componentList.forEach((element) => {
          let gridItem = {
            index: parseInt(element.index),
            type: element.type,
            dropX: parseInt(element.dataGrid.x),
            dropY: parseInt(element.dataGrid.y),
            w: parseInt(element.dataGrid.w),
            h: parseInt(element.dataGrid.h),
            minW: isNotEmpty(element.dataGrid.minW)
              ? parseInt(element.dataGrid.minW)
              : null,
            minH: isNotEmpty(element.dataGrid.minH)
              ? parseInt(element.dataGrid.minH)
              : null,
            maxW: isNotEmpty(element.dataGrid.maxW)
              ? parseInt(element.dataGrid.maxW)
              : null,
            maxH: isNotEmpty(element.dataGrid.maxH)
              ? parseInt(element.dataGrid.maxH)
              : null,
            component: element.component,
            value: element.value,
          };

          let headerValue = {
            name: element.index,
            value: element.value,
          };
          compHeaders.push(headerValue);
          gridItemList.push(gridItem);
        });
        setHeaders(compHeaders);
        dispatch(actions.setCompHeaders(compHeaders));

        chartList.forEach((element) => {
          let gridItem = {
            index: parseInt(element.index),
            type: element.type,
            dataset: element.dataset,
            dropX: parseInt(element.dataGrid.x),
            dropY: parseInt(element.dataGrid.y),
            w: parseInt(element.dataGrid.w),
            h: parseInt(element.dataGrid.h),
            minW: isNotEmpty(element.dataGrid.minW)
              ? parseInt(element.dataGrid.minW)
              : null,
            minH: isNotEmpty(element.dataGrid.minH)
              ? parseInt(element.dataGrid.minH)
              : null,
            maxW: isNotEmpty(element.dataGrid.maxW)
              ? parseInt(element.dataGrid.maxW)
              : null,
            maxH: isNotEmpty(element.dataGrid.maxH)
              ? parseInt(element.dataGrid.maxH)
              : null,
            chartId: element.chartId,
            chartType: element.chartType,
          };

          gridItemList.push(gridItem);
        });
        setGridItems(gridItemList);
        dispatch(actions.setGridItemList(gridItemList));
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  }

  function onChangeHeader(index, element) {
    // const name = element.target.name;
    const value = element.target.value;
    let compHeaders = headers;
    let isNew = true;
    compHeaders.forEach((el) => {
      if (el.name === String(index)) {
        // edit
        isNew = false;
        el.value = value;
      }
    });
    setHeaders(compHeaders);
    dispatch(actions.setCompHeaders(compHeaders));

    if (isNew) {
      // new
      let headerValue = {
        name: index,
        value: value,
      };
      compHeaders.push(headerValue);
      setHeaders(compHeaders);
      dispatch(actions.setCompHeaders(compHeaders));
    }
  }

  const defaultProps = {
    className: "dashboard-layout",
    //items: 20,
    cols: 12,
    rowHeight: 10,
    isResizable: false,
    onLayoutChange: function () {},
    // This turns off compaction so you can place items wherever.
    compactType: null,
    //resizeHandles: ["se"],
  };

  const onLayoutChange = (layout) => {
    //console.log(layout);
    saveToLS("layout", layout);
    setLayout(layout);
    dispatch(actions.setDashboardLayout(layout));
    defaultProps.onLayoutChange(layout);
  };

  function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }

  function saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value,
        })
      );
    }
  }

  function allowDrop(e) {
    e.preventDefault();
  }

  function dropThis(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("builder");
    // console.log(data);
    // console.log(
    //   "event.client - X: " +
    //     _.round(e.clientX / 120) +
    //     ", Y: " +
    //     _.round(e.clientY / 100)
    // );
    let currGridItemCount = gridItemCount + 1;
    setGridItemCount(currGridItemCount);

    // TODO: calculate the last element index
    const lastIndex = Math.max.apply(
      Math,
      gridItems.map(function (o) {
        return o.index;
      })
    );

    let builderType = "";
    let builderComponent = "";
    if (data.match("component")) {
      builderType = "component";
      builderComponent = data.substr(14); // data : new-component-xxxx
    } else {
      builderType = "chart";
    }
    let gridItem = {
      index: lastIndex + 1,
      type: builderType,
      dropX: _.round(e.clientX / 120),
      dropY: _.round(e.clientY / 100),
      component: builderComponent,
      chartId: data.substr(0, data.indexOf("_")),
      chartType: data.substr(data.indexOf("_") + 1),
    };

    setGridItems([...gridItems, gridItem]);

    dispatch(actions.setGridItemList([...currGridItemList, gridItem]));
  }

  function createElement(el) {
    let itemIsResizable = true;
    if (el.type === "component") {
      if (el.component === "header") {
        let headerStyle = {};
        let disabled = false;
        if (dashboardMode === "edit") {
          headerStyle = {
            cursor: "move",
            paddingTop: "16px",
            paddingBottom: "16px",
            backgroundColor: "light",
            borderStyle: "dashed",
            borderWidth: "1px",
            verticalAlign: "middle",
          };

          return (
            <div
              id={"dashboard-panel_" + el.index + "_" + el.component}
              key={el.index}
              data-grid={{
                x: el.dropX,
                y: el.dropY,
                w: isNotEmpty(el.w) ? el.w : 12,
                h: isNotEmpty(el.h) ? el.h : 4,
                minH: isNotEmpty(el.minH) ? el.minH : 4,
                maxH: isNotEmpty(el.maxH) ? el.maxH : 4,
                isResizable: itemIsResizable,
              }}
              style={headerStyle}
            >
              <input
                name={"header-" + el.index}
                type="text"
                style={{
                  fontWeight: "700",
                  height: "29px",
                  border: "none",
                  backgroundColor: "transparent",
                }}
                placeholder={
                  headers.length > 0
                    ? headers.filter(
                        (header) => header.name === String(el.index)
                      )[0].value
                    : "New header"
                }
                onChange={(e) => onChangeHeader(el.index, e)}
              />
              <span
                className="remove-grid-item-btn"
                style={removeStyle}
                onClick={() => onRemoveItem(el.index)}
              >
                x
              </span>
            </div>
          );
        } else if (dashboardMode === "view") {
          headerStyle = {
            cursor: "default",
            paddingTop: "16px",
            paddingBottom: "16px",
            backgroundColor: "light",
            verticalAlign: "middle",
          };
          itemIsResizable = false;
          disabled = true;

          return (
            <div
              id={"dashboard-panel_" + el.index + "_" + el.component}
              key={el.index}
              data-grid={{
                x: el.dropX,
                y: el.dropY,
                w: isNotEmpty(el.w) ? el.w : 12,
                h: isNotEmpty(el.h) ? el.h : 4,
                minH: isNotEmpty(el.minH) ? el.minH : 4,
                maxH: isNotEmpty(el.maxH) ? el.maxH : 4,
                isResizable: itemIsResizable,
              }}
              style={headerStyle}
            >
              <input
                name={"header-" + el.index}
                type="text"
                style={{
                  fontWeight: "700",
                  height: "29px",
                  border: "none",
                  backgroundColor: "transparent",
                }}
                placeholder="New header"
                onChange={(e) => onChangeHeader(el.index, e.target.value)}
                value={
                  headers.filter(
                    (header) => header.name === String(el.index)
                  )[0].value
                }
                disabled={disabled}
              />
              <span
                className="remove-grid-item-btn"
                style={removeStyle}
                onClick={() => onRemoveItem(el.index)}
              >
                x
              </span>
            </div>
          );
        }
      } else if (el.component === "divider") {
        let dividerStyle = {
          cursor: "move",
          padding: "8px 0",
          backgroundColor: "transparent",
          color: "#263238",
        };
        if (dashboardMode === "edit") {
        } else if (dashboardMode === "view") {
          itemIsResizable = false;
          dividerStyle = {
            cursor: "default",
            padding: "8px 0",
            backgroundColor: "transparent",
            color: "#263238",
          };
        }
        return (
          <div
            id={"dashboard-panel_" + el.index + "_" + el.component}
            key={el.index}
            data-grid={{
              x: el.dropX,
              y: el.dropY,
              w: isNotEmpty(el.w) ? el.w : 12,
              h: isNotEmpty(el.h) ? el.h : 1,
              minW: isNotEmpty(el.minW) ? el.minW : 12,
              minH: isNotEmpty(el.minH) ? el.minH : 1,
              maxW: isNotEmpty(el.maxW) ? el.maxW : 12,
              maxH: isNotEmpty(el.maxH) ? el.maxH : 1,
              isResizable: "false",
              resizeHandles: ["ne"],
            }}
          >
            <div
              className="dashboard-component dashboard-component-divider"
              style={dividerStyle}
            ></div>
            <span
              className="remove-grid-item-btn"
              style={removeStyle}
              onClick={() => onRemoveItem(el.index)}
            >
              x
            </span>
          </div>
        );
      }
    } else if (el.type === "chart") {
      let chartStyle = {};
      if (dashboardMode === "edit") {
        chartStyle = {
          cursor: "move",
          borderStyle: "dashed",
          borderWidth: "1px",
          verticalAlign: "middle",
          backgroundColor: "white",
        };
        itemIsResizable = true;
      } else if (dashboardMode === "view") {
        chartStyle = {
          cursor: "default",
          verticalAlign: "middle",
          backgroundColor: "white",
        };
        itemIsResizable = false;
      }
      return (
        <div
          id={"dashboard-panel_" + el.index + "_" + el.chartId}
          className="dashboard-chart-componet-panel"
          key={el.index}
          data-grid={{
            x: el.dropX,
            y: el.dropY,
            w: isNotEmpty(el.w) ? el.w : 3,
            h: isNotEmpty(el.h) ? el.h : 18,
            minW: isNotEmpty(el.minW) ? el.minW : 2,
            minH: isNotEmpty(el.minH) ? el.minH : 1,
            isResizable: itemIsResizable,
          }}
          style={chartStyle}
        >
          <DashboardChartView
            index={el.index}
            chartId={el.chartId}
            chartType={el.chartType}
          />
          <span
            className="remove-grid-item-btn"
            style={removeStyle}
            onClick={() => onRemoveItem(el.index)}
          >
            x
          </span>
        </div>
      );
    }
  }

  function onRemoveItem(index) {
    setGridItems(_.reject(gridItems, { index: index }));
    dispatch(
      actions.setGridItemList(_.reject(currGridItemList, { index: index }))
    );
  }
  return (
    <div
      className="grid-container"
      onDragOver={allowDrop}
      onDrop={dropThis}
      style={{
        flexGrow: "1",
        position: "relative",
        margin: "24px 36px 24px",
        display: "block",
      }}
    >
      <ReactGridLayout
        {...defaultProps}
        //layout={layout}
        onLayoutChange={onLayoutChange}
        style={{ width: "100%", height: "100%" }}
        isDraggable={rglDraggable}
      >
        {_.map(gridItems, (el) => createElement(el))}
      </ReactGridLayout>
    </div>
  );
};

export default DashboardContentGridContainer;
