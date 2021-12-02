/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 입력합니다.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_DASHBOARD_ID = "dashboard/SET_DASHBOARD_ID";
const SET_DASHBOARD_TITLE = "dashboard/SET_DASHBOARD_TITLE";
const SET_DASHBOARD_LAYOUT = "dashboard/SET_DASHBOARD_LAYOUT";
const SET_DASHBOARD_MODE = "dashboard/SET_DASHBOARD_MODE";
const SET_REMOVE_STYLE = "dashboard/SET_REMOVE_STYLE";
const SET_GRID_ITEM_COUNT = "dashboard/SET_GRID_ITEM_COUNT";
const SET_COMP_HEADERS = "dashboard/SET_COMP_HEADERS";
const SET_GRID_ITEM_LIST = "dashboard/SET_GRID_ITEM_LIST";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보냅니다.
export const setDashboardId = (data) => ({ type: SET_DASHBOARD_ID, data });
export const setDashboardTitle = (data) => ({
  type: SET_DASHBOARD_TITLE,
  data,
});
export const setDashboardLayout = (data) => ({
  type: SET_DASHBOARD_LAYOUT,
  data,
});
export const setDashboardMode = (data) => ({
  type: SET_DASHBOARD_MODE,
  data,
});
export const setRemoveStyle = (data) => ({
  type: SET_REMOVE_STYLE,
  data,
});
export const setGridItemCount = (data) => ({
  type: SET_GRID_ITEM_COUNT,
  data,
});
export const setCompHeaders = (data) => ({
  type: SET_COMP_HEADERS,
  data,
});
export const setGridItemList = (data) => ({
  type: SET_GRID_ITEM_LIST,
  data,
});

/* 초기 상태 선언 */
const initialState = {
  dashboardId: "",
  dashboardTitle: "[ untitled dashboard ]",
  dashboardLayout: [],
  dashboardMode: "",
  removeStyle: {
    position: "absolute",
    right: "2px",
    top: 0,
    cursor: "pointer",
  },
  currGridItemCount: 0,
  currCompHeaders: [],
  currGridItemList: [],
};

/* 리듀서 선언 */
// 리듀서는 export default 로 작성합니다.
export default function DashboardChartView(state = initialState, action) {
  switch (action.type) {
    case SET_DASHBOARD_ID:
      return {
        ...state,
        dashboardId: action.data,
      };
    case SET_DASHBOARD_TITLE:
      return {
        ...state,
        dashboardTitle: action.data,
      };
    case SET_DASHBOARD_LAYOUT:
      return {
        ...state,
        dashboardLayout: action.data,
      };
    case SET_DASHBOARD_MODE:
      return {
        ...state,
        dashboardMode: action.data,
      };
    case SET_REMOVE_STYLE:
      return {
        ...state,
        removeStyle: action.data,
      };
      case SET_GRID_ITEM_COUNT:
      return {
        ...state,
        currGridItemCount: action.data,
      };
      case SET_COMP_HEADERS:
      return {
        ...state,
        currCompHeaders: action.data,
      };
      case SET_GRID_ITEM_LIST:
      return {
        ...state,
        currGridItemList: action.data,
      };
    default:
      return state;
  }
}
