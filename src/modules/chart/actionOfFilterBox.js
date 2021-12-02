/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 입력합니다.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_FILTER_BOX_DATA = "chart/SET_FILTER_BOX_DATA";
const SET_FILTER_BOX_DATASET = "chart/SET_FILTER_BOX_DATASET";
const SET_FILTER_BOX_CONDITION = "chart/SET_FILTER_BOX_CONDITION";
const SET_FILTER_BOX_APPLY = "chart/SET_FILTER_BOX_APPLY";
const SET_CLICK_COUNT = "chart/SET_CLICK_COUNT";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보냅니다.
export const setFilterBoxData = (data) => ({ type: SET_FILTER_BOX_DATA, data });
export const setFilterBoxDataset = (data) => ({
  type: SET_FILTER_BOX_DATASET,
  data,
});
export const setFilterBoxCondition = (data) => ({
  type: SET_FILTER_BOX_CONDITION,
  data,
});
export const setFilterBoxApply = (data) => ({
  type: SET_FILTER_BOX_APPLY,
  data,
});
export const setClickCount = (data) => ({
  type: SET_CLICK_COUNT,
  data,
});

/* 초기 상태 선언 */
const initialState = {
  filterBoxData: [],
  filterBoxDataset: "",
  filterBoxCondition: [],
  filterBoxApply: false,
  clickCount: 0,
};

/* 리듀서 선언 */
// 리듀서는 export default 로 작성합니다.
export default function actionOfFilterBox(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER_BOX_DATA:
      return {
        ...state,
        filterBoxData: action.data,
      };
    case SET_FILTER_BOX_DATASET:
      return {
        ...state,
        filterBoxDataset: action.data,
      };
    case SET_FILTER_BOX_CONDITION:
      return {
        ...state,
        filterBoxCondition: action.data,
      };
    case SET_FILTER_BOX_APPLY:
      return {
        ...state,
        filterBoxApply: action.data,
      };
    case SET_CLICK_COUNT:
      return {
        ...state,
        clickCount: action.data,
      };
    default:
      return state;
  }
}
