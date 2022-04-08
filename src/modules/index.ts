import { combineReducers } from 'redux';
import session from "@modules/user/session";
import actionOfUser from "@modules/user/actionOfUser";
import actionOfCode from "@src/modules/system/actionOfCode";

// to combine all reducers together
const appReducer = combineReducers({
    session,
    actionOfUser,
    actionOfCode,
});

const RESET_STORE = "RESET_STORE";
const INIT_STORE = "INIT_STORE";

// to reset the state of redux store
export const resetStore = () => {
    return {
        type: RESET_STORE
    }
}
export const initStore = () => {
    return {
        type: INIT_STORE
    }
}

const rootReducer = (state: any, action: any) => {
    if (action.type === INIT_STORE) {
        // reset all Reducers state
        state = undefined;
    }
    if (action.type === RESET_STORE) {
        // reset all Reducers state
        //state = undefined;

        // exclude Login User Information
        const { session, actionOfUser, actionOfCode } = state;
        state = undefined;
        state = { session, actionOfUser, actionOfCode };
    }

    return appReducer(state, action)
}

// React에서 사용할 수 있도록 타입을 만들어 export 해준다.
export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;