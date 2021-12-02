/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 입력합니다.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_TIME_COLUMN = "chart/SET_TIME_COLUMN";
const SET_TIME_GRAIN = "chart/SET_TIME_GRAIN";
const SET_TIME_RANGE = "chart/SET_TIME_RANGE";
const SET_QUERY_COLUMNS = "chart/SET_QUERY_COLUMNS";
const SET_QUERY_ORDERING = "chart/SET_QUERY_ORDERING";
const SET_QUERY_ROW_LIMIT = "chart/SET_QUERY_ROW_LIMIT";
const SET_QUERY_FILTERS = "chart/QUERY_FILTER";
const SET_QUERY_METRIC = "chart/SET_QUERY_METRIC";
const SET_QUERY_METRICS = "chart/SET_QUERY_METRICS";
const SET_QUERY_GROUP_BY = "chart/SET_QUERY_GROUP_BY";
const SET_QUERY_SERIES = "chart/SET_QUERY_SERIES";
const SET_QUERY_SINGLE_SERIES = "chart/SET_QUERY_SINGLE_SERIES";
const SET_QUERY_ENTITY = "chart/SET_QUERY_ENTITY";
const SET_QUERY_XAXIS = "chart/SET_QUERY_XAXIS";
const SET_QUERY_YAXIS = "chart/SET_QUERY_YAXIS";
const SET_QUERY_BUBBLE_SIZE = "chart/SET_QUERY_BUBBLE_SIZE";
const SET_QUERY_MAX_BUBBLE_SIZE = "chart/SET_QUERY_MAX_BUBBLE_SIZE";
const SET_OPTIONS_NUMBER_FORMAT = "chart/SET_OPTIONS_NUMBER_FORMAT";
const SET_FILTERS_CONFIGURATION = "chart/SET_FILTERS_CONFIGURATION";
const SET_FILTERS_NUMBER = "chart/SET_FILTERS_NUMBER";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보냅니다.
export const setTimeColumn = (data) => ({ type: SET_TIME_COLUMN, data });
export const setTimeGrain = (data) => ({ type: SET_TIME_GRAIN, data });
export const setTimeRange = (data) => ({ type: SET_TIME_RANGE, data });
export const setQueryColumns = (data) => ({ type: SET_QUERY_COLUMNS, data });
export const setQueryOrdering = (data) => ({ type: SET_QUERY_ORDERING, data });
export const setQueryRowLimit = (data) => ({ type: SET_QUERY_ROW_LIMIT, data });
export const setQueryFilters = (data) => ({ type: SET_QUERY_FILTERS, data });
export const setQueryMetric = (data) => ({ type: SET_QUERY_METRIC, data });
export const setQueryMetrics = (data) => ({ type: SET_QUERY_METRICS, data });
export const setQueryGroupBy = (data) => ({ type: SET_QUERY_GROUP_BY, data });
export const setQuerySeries = (data) => ({ type: SET_QUERY_SERIES, data });
export const setQuerySingleSeries = (data) => ({
  type: SET_QUERY_SINGLE_SERIES,
  data,
});
export const setQueryEntity = (data) => ({ type: SET_QUERY_ENTITY, data });
export const setQueryXaxis = (data) => ({ type: SET_QUERY_XAXIS, data });
export const setQueryYaxis = (data) => ({ type: SET_QUERY_YAXIS, data });
export const setQueryBubbleSize = (data) => ({
  type: SET_QUERY_BUBBLE_SIZE,
  data,
});
export const setQueryMaxBubbleSize = (data) => ({
  type: SET_QUERY_MAX_BUBBLE_SIZE,
  data,
});
export const setOptionsNumberFormat = (data) => ({
  type: SET_OPTIONS_NUMBER_FORMAT,
  data,
});
export const setFiltersConfiguration = (data) => ({
  type: SET_FILTERS_CONFIGURATION,
  data,
});
export const setFilterBoxNumber = (data) => ({
  type: SET_FILTERS_NUMBER,
  data,
});

/* 초기 상태 선언 */
const initialState = {
  timeColumn: "",
  timeGrain: "",
  timeRange: "month",
  queryColumns: [],
  queryOrdering: [],
  queryRowLimit: "",
  queryFilters: [],
  queryMetric: {},
  queryMetrics: [],
  queryGroupBy: [],
  querySeries: [],
  querySingleSeries: "",
  queryEntity: "",
  queryXaxis: {},
  queryYaxis: {},
  queryBubbleSize: {},
  queryMaxBubbleSize: "",
  optionsNumberFormat: "",
  filtersConfiguration: [],
  numFilterBox: 0,
};

/* 리듀서 선언 */
// 리듀서는 export default 로 작성합니다.
export default function makeChartPanelLeft(state = initialState, action) {
  switch (action.type) {
    case SET_TIME_COLUMN:
      return {
        ...state,
        timeColumn: action.data,
      };
    case SET_TIME_GRAIN:
      return {
        ...state,
        timeGrain: action.data,
      };
    case SET_TIME_RANGE:
      return {
        ...state,
        timeRange: action.data,
      };
    case SET_QUERY_COLUMNS:
      return {
        ...state,
        queryColumns: action.data,
      };
    case SET_QUERY_ORDERING:
      return {
        ...state,
        queryOrdering: action.data,
      };
    case SET_QUERY_ROW_LIMIT:
      return {
        ...state,
        queryRowLimit: action.data,
      };
    case SET_QUERY_FILTERS:
      return {
        ...state,
        queryFilters: action.data,
      };
    case SET_QUERY_METRIC:
      return {
        ...state,
        queryMetric: action.data,
      };
    case SET_QUERY_METRICS:
      return {
        ...state,
        queryMetrics: action.data,
      };
    case SET_QUERY_GROUP_BY:
      return {
        ...state,
        queryGroupBy: action.data,
      };
    case SET_QUERY_SERIES:
      return {
        ...state,
        querySeries: action.data,
      };
    case SET_QUERY_SINGLE_SERIES:
      return {
        ...state,
        querySingleSeries: action.data,
      };
    case SET_QUERY_ENTITY:
      return {
        ...state,
        queryEntity: action.data,
      };
    case SET_QUERY_XAXIS:
      return {
        ...state,
        queryXaxis: action.data,
      };
    case SET_QUERY_YAXIS:
      return {
        ...state,
        queryYaxis: action.data,
      };
    case SET_QUERY_BUBBLE_SIZE:
      return {
        ...state,
        queryBubbleSize: action.data,
      };
    case SET_QUERY_MAX_BUBBLE_SIZE:
      return {
        ...state,
        queryMaxBubbleSize: action.data,
      };
    case SET_OPTIONS_NUMBER_FORMAT:
      return {
        ...state,
        optionsNumberFormat: action.data,
      };
    case SET_FILTERS_CONFIGURATION:
      return {
        ...state,
        filtersConfiguration: action.data,
      };
    case SET_FILTERS_NUMBER:
      return {
        ...state,
        numFilterBox: action.data,
      };
    default:
      return state;
  }
}
