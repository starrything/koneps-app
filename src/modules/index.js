import { combineReducers } from 'redux';
import user from "~/modules/login/user";
// Chart page
import datasetAndChartType from "~/modules/chart/datasetAndChartType";
import makeChartPanelLeft from "~/modules/chart/makeChartPanelLeft";
import makeChartPanelRight from "~/modules/chart/makeChartPanelRight";

import actionOfTable from "~/modules/chart/actionOfTable";
import actionOfLineChart from "~/modules/chart/actionOfLineChart";
import actionOfBarChart from "~/modules/chart/actionOfBarChart";
import actionOfPieChart from "~/modules/chart/actionOfPieChart";
import actionOfBubbleChart from "~/modules/chart/actionOfBubbleChart";
import actionOfBigNumber from "~/modules/chart/actionOfBigNumber";
import actionOfFilterBox from "~/modules/chart/actionOfFilterBox";

// Dashboard page
import dashboardChartView from "~/modules/dashboard/dashboardChartView";
import actionOfDashboard from "~/modules/dashboard/actionOfDashboard";

// Global
import actionOfGlobal from "~/modules/global/actionOfGlobal";
import actionOfCode from "~/modules/global/actionOfCode";
import actionOfUser from "~/modules/global/actionOfUser";

// to combine all reducers together
const appReducer = combineReducers({
  user,
  actionOfUser,
  actionOfCode,
  actionOfGlobal,
  datasetAndChartType,
  makeChartPanelLeft,
  actionOfTable,
  actionOfLineChart,
  actionOfBarChart,
  actionOfPieChart,
  actionOfBubbleChart,
  actionOfBigNumber,
  actionOfFilterBox,
  makeChartPanelRight,
  dashboardChartView,
  actionOfDashboard,
});

const RESET_STORE = "RESET_STORE";
const RESET_LEFT_CONTROL_PANEL = "RESET_LEFT_CONTROL_PANEL";
const RESET_DASHBOARD = "RESET_DASHBOARD";

// to reset the state of redux store
export const resetStore = () => {
  return {
    type: RESET_STORE
  }
}
export const resetLeftControlPanel = () => {
  return {
    type: RESET_LEFT_CONTROL_PANEL
  }
}
export const resetDashboard = () => {
  return {
    type: RESET_DASHBOARD
  }
}

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    // reset all Reducers state
    //state = undefined;

    // exclude Login User Information
    const { user, actionOfCode, actionOfUser } = state;
    state = undefined;
    state = { user, actionOfCode, actionOfUser };
  }
  if (action.type === RESET_LEFT_CONTROL_PANEL) {
    // reset all Reducers state
    //state = undefined;

    // exclude Data source of Chart
    const { user, datasetAndChartType, makeChartPanelRight } = state;
    state = undefined;
    state = { user, datasetAndChartType, makeChartPanelRight };
  }
  if (action.type === RESET_DASHBOARD) {
    // reset all Reducers state
    //state = undefined;

    // exclude Data source of Chart
    const { user, actionOfDashboard } = state;
    state = undefined;
    state = { user, actionOfDashboard };
  }
  return appReducer(state, action)
}

export default rootReducer;