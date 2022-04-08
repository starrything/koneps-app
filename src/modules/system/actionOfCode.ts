/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 입력합니다.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_ROLE_LIST = "code/SET_ROLE_LIST";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보냅니다.
export const setRoleList = (data: any) => ({ type: SET_ROLE_LIST, data });

/* 초기 상태 선언 */
const initialState = {
  roleList: [],
};

/* 리듀서 선언 */
// 리듀서는 export default 로 작성합니다.
export default function actionOfCode(state = initialState, action: any) {
  switch (action.type) {
    case SET_ROLE_LIST:
      return {
        ...state,
        roleList: action.data,
      };
    default:
      return state;
  }
}
