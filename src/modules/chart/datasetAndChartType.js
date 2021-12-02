/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 입력합니다.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_DATASET_ID = "chart/SET_DATASET_ID";
const SET_CHART_ID = "chart/SET_CHART_ID";
const SET_CHART_TYPE = "chart/SET_CHART_TYPE";
const SET_CHART_TITLE = "chart/SET_CHART_TITLE";
const SET_DATASET_SPECS = "chart/SET_DATASET_SPECS";
const SET_CANVAS_MODE = "chart/SET_CANVAS_MODE";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보냅니다.
export const setDatasetId = (data) => ({ type: SET_DATASET_ID, data });
export const setChartId = (data) => ({ type: SET_CHART_ID, data });
export const setChartType = (data) => ({ type: SET_CHART_TYPE, data });
export const setChartTitle = (data) => ({ type: SET_CHART_TITLE, data });
export const setDatasetSpecs = (data) => ({ type: SET_DATASET_SPECS, data });
export const setCanvasMode = (data) => ({ type: SET_CANVAS_MODE, data });

/* 초기 상태 선언 */
const initialState = {
  datasetId: "",
  chartId: "",
  chartType: "",
  chartTitle: "- This is Title",
  datasetSpecs: [],
  canvasMode: "",
};

/* 리듀서 선언 */
// 리듀서는 export default 로 작성합니다.
export default function datasetAndChartType(state = initialState, action) {
  switch (action.type) {
    case SET_DATASET_ID:
      return {
        ...state,
        datasetId: action.data,
      };
    case SET_CHART_ID:
      return {
        ...state,
        chartId: action.data,
      };
    case SET_CHART_TYPE:
      return {
        ...state,
        chartType: action.data,
      };
    case SET_CHART_TITLE:
      return {
        ...state,
        chartTitle: action.data,
      };
    case SET_DATASET_SPECS:
      return {
        ...state,
        datasetSpecs: action.data,
      };
    case SET_CANVAS_MODE:
      return {
        ...state,
        canvasMode: action.data,
      };
    default:
      return state;
  }
}
