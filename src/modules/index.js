import { combineReducers } from 'redux';
import user from "~/modules/login/user";

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

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    // reset all Reducers state
    //state = undefined;

    // exclude Login User Information
    const { user, actionOfCode, actionOfUser } = state;
    state = undefined;
    state = { user, actionOfCode, actionOfUser };
  }
  return appReducer(state, action)
}

export default rootReducer;