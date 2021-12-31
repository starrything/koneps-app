import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AxiosConfig from "~/utils/AxiosConfig";
import * as actions from "~/modules/dashboard/actionOfDashboard";
import { resetStore } from "~/modules/index";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { isNotEmpty } from "~/utils/Valid";

const MySwal = withReactContent(Swal);

const DashboardHeader = (props) => {
  let history = useHistory();
  const dashboardId = useSelector(
    (state) => state.actionOfDashboard.dashboardId
  );
  const currCompHeaders = useSelector(
    (state) => state.actionOfDashboard.currCompHeaders
  );
  const [buttonContainerStyle, setButtonContainerStyle] = useState({
    display: "table-cell",
    verticalAlign: "middle",
  });
  let dashboardEditBtnStyle;
  let dashboardSaveBtnStyle;

  const [dashboardTitle, setDashboardTitle] = useState(
    "[ untitled dashboard ]"
  );

  const [disabled, setDisabled] = useState(false);
  const [chartTitleStyle, setChartTitleStyle] = useState({
    fontSize: "24px",
    padding: "2px",
  });
  useEffect(() => {
    if (isNotEmpty(dashboardId)) {
      // set dashboardTitle
      AxiosConfig.get("/api/dashboard/title", {
        params: {
          dashboardId: dashboardId,
        },
      })
        .then(function (response) {
          // success
          setDashboardTitle(response.data);
          dispatch(actions.setDashboardTitle(response.data));
        })
        .catch(function (error) {
          // error
        })
        .then(function () {
          // finally
        });
    }

    if (dashboardMode === "edit") {
      setDisabled(false);
      setChartTitleStyle({ fontSize: "24px", padding: "2px" });
    } else {
      setDisabled(true);
      setChartTitleStyle({ fontSize: "24px", padding: "2px", border: "0" });
    }
  }, []);

  const dispatch = useDispatch();
  let rglLayout = useSelector(
    (state) => state.actionOfDashboard.dashboardLayout
  );

  function changeDashboardTitle(title) {
    setDashboardTitle(title);
    dispatch(actions.setDashboardTitle(title));
  }

  function editDashboard() {
    dashboardEditBtnStyle = { display: "block" };
    dashboardSaveBtnStyle = { display: "none" };
    dispatch(actions.setDashboardMode("edit"));
    dispatch(
      actions.setRemoveStyle({
        position: "absolute",
        right: "2px",
        top: 0,
        cursor: "pointer",
      })
    );
    history.push("/dashboard/edit/" + dashboardId);
  }

  function saveDashboard() {
    const dashboardLayout =
      document.getElementsByClassName("dashboard-layout")[0];

    let rglLayoutList = [];
    dashboardLayout.childNodes.forEach((el) => {
      //console.log(el.id);
      const panelId = el.id;
      const firstIndex = panelId.indexOf("_");
      const lastIndex = panelId.lastIndexOf("_");
      const elementIndex = panelId.substr(
        firstIndex + 1,
        lastIndex - firstIndex - 1
      );
      const panelFeature = panelId.substr(lastIndex + 1);
      let elementValue = "";
      currCompHeaders.forEach((h) => {
        if (h.name === elementIndex) {
          elementValue = h.value;
        }
      });

      rglLayout.forEach((layout) => {
        if (layout.i === elementIndex) {
          layout["panelId"] = panelId;
          layout["feature"] = panelFeature;
          layout["value"] = elementValue;
          rglLayoutList.push(layout);
        }
      });
    });
    //console.log(rglLayoutList);

    AxiosConfig.post("/api/dashboard", {
      dashboardId: dashboardId,
      dashboardTitle: dashboardTitle,
      dashboardLayout: rglLayoutList,
    })
      .then(function (response) {
        // success
        dispatch(resetStore());
        dispatch(actions.setDashboardId(response.data));
        dispatch(actions.setDashboardMode("view"));
        //alert("Saved successfuly.");
        MySwal.fire({
          icon: "success",
          text: "Saved successfuly.",
        });
        history.push("/dashboard/view/" + response.data);
      })
      .catch(function (error) {
        // error
        //alert("Failed to save this Dashboard.");
        MySwal.fire({
          icon: "error",
          text: "Failed to save this Dashboard.",
        });
      })
      .then(function () {
        // finally
      });
  }

  const gnbView = useSelector((state) => state.actionOfGlobal.gnbView);

  const dashboardMode = useSelector(
    (state) => state.actionOfDashboard.dashboardMode
  );
  if (dashboardMode === "edit" && gnbView === "show") {
    dashboardEditBtnStyle = { display: "none" };
    dashboardSaveBtnStyle = { display: "block" };
  } else if (dashboardMode === "view" && gnbView === "show") {
    dashboardEditBtnStyle = { display: "block" };
    dashboardSaveBtnStyle = { display: "none" };
  } else {
    dashboardEditBtnStyle = { display: "none" };
    dashboardSaveBtnStyle = { display: "none" };
  }

  return (
    <div
      className="dashboard-header bg-light"
      style={{
        paddingLeft: "0px",
        paddingRight: "0px",
        height: "71px",
        zIndex: "100",
        transform: "translateZ(0px)",
      }}
    >
      <div
        className="shadow p-3 mb-5 bg-body rounded"
        id="dashboardHeaderBox"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "24px",
          paddingLeft: "24px",
        }}
      >
        <div
          className="dashboard-component-header header-large"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "28px",
            //paddingTop: "16px",
            //paddingBottom: "16px",
          }}
        >
          <span style={{ fontWeight: "200", fontSize: "28px" }}>
            <input
              type="text"
              className="form-control bg-white"
              id="chartTitle"
              name="chartTitle"
              value={dashboardTitle}
              onChange={(e) => changeDashboardTitle(e.target.value)}
              style={chartTitleStyle}
              size="40"
              disabled={disabled}
            />
          </span>
        </div>
        <div className="button-container" style={buttonContainerStyle}>
          <div style={{ display: "inline-block", paddingRight: "5px" }}>
            <button
              className="btn btn-sm btn-outline-primary"
              type="button"
              onClick={() => editDashboard()}
              style={dashboardEditBtnStyle}
            >
              Edit
            </button>
          </div>
          <div style={{ display: "inline-block", paddingRight: "5px" }}>
            <button
              className="btn btn-sm btn-outline-success"
              type="button"
              onClick={() => saveDashboard()}
              style={dashboardSaveBtnStyle}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
