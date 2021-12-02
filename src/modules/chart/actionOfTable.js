/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 입력합니다.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_TABLE_GRID_API = "chart/SET_TABLE_GRID_API";
const SET_TABLE_ROWDATA = "chart/SET_TABLE_ROWDATA";
const SET_TABLE_COLDEFS = "chart/SET_TABLE_COLDEFS";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보냅니다.
export const setTableGridApi = (data) => ({ type: SET_TABLE_GRID_API, data });
export const setTableRowdata = (data) => ({ type: SET_TABLE_ROWDATA, data });
export const setTableColdefs = (data) => ({ type: SET_TABLE_COLDEFS, data });

/* 초기 상태 선언 */
const initialState = {
  tableRowData: [],
  tableColDefs: [],
};

/* 리듀서 선언 */
// 리듀서는 export default 로 작성합니다.
export default function actionOfTable(state = initialState, action) {
  switch (action.type) {
    case SET_TABLE_GRID_API:
      return {
        ...state,
        tableGridApi: action.data,
      };
    case SET_TABLE_ROWDATA:
      return {
        ...state,
        tableRowData: action.data,
      };
    case SET_TABLE_COLDEFS:
      return {
        ...state,
        tableColDefs: action.data,
      };
    default:
      return state;
  }
}
