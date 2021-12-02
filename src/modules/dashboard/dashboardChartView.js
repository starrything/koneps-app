/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 입력합니다.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_DATASET_ID = "chartview/SET_DATASET_ID";
const SET_CHART_TITLE = "chartview/SET_CHART_TITLE";

const SET_TIME_COLUMN = "chartview/SET_TIME_COLUMN";
const SET_TIME_GRAIN = "chartview/SET_TIME_GRAIN";
const SET_TIME_RANGE = "chartview/SET_TIME_RANGE";
const SET_QUERY_COLUMNS = "chartview/SET_QUERY_COLUMNS";
const SET_QUERY_ORDERING = "chartview/SET_QUERY_ORDERING";
const SET_QUERY_ROW_LIMIT = "chartview/SET_QUERY_ROW_LIMIT";
const SET_QUERY_FILTERS = "chartview/QUERY_FILTER";
const SET_QUERY_METRIC = "chartview/SET_QUERY_METRIC";
const SET_QUERY_METRICS = "chartview/SET_QUERY_METRICS";
const SET_QUERY_GROUP_BY = "chartview/SET_QUERY_GROUP_BY";
const SET_QUERY_SERIES = "chartview/SET_QUERY_SERIES";
const SET_QUERY_SINGLE_SERIES = "chartview/SET_QUERY_SINGLE_SERIES";
const SET_QUERY_ENTITY = "chartview/SET_QUERY_ENTITY";
const SET_QUERY_XAXIS = "chartview/SET_QUERY_XAXIS";
const SET_QUERY_YAXIS = "chartview/SET_QUERY_YAXIS";
const SET_QUERY_BUBBLE_SIZE = "chartview/SET_QUERY_BUBBLE_SIZE";
const SET_QUERY_MAX_BUBBLE_SIZE = "chartview/SET_QUERY_MAX_BUBBLE_SIZE";
const SET_OPTIONS_NUMBER_FORMAT = "chartview/SET_OPTIONS_NUMBER_FORMAT";
const SET_FILTERS_CONFIGURATION = "chartview/SET_FILTERS_CONFIGURATION";
const SET_FILTERS_NUMBER = "chartview/SET_FILTERS_NUMBER";

const SET_CHART_HISTORY = "chartview/SET_CHART_HISTORY";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보냅니다.
export const setDatasetId = (data) => ({ type: SET_DATASET_ID, data });
export const setChartTitle = (data) => ({ type: SET_CHART_TITLE, data });

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
export const setFiltersConfiguation = (data) => ({
  type: SET_FILTERS_CONFIGURATION,
  data,
});
export const setFilterBoxNumber = (data) => ({
  type: SET_FILTERS_NUMBER,
  data,
});
export const setChartHistory = (data) => ({
  type: SET_CHART_HISTORY,
  data,
});

/* 초기 상태 선언 */
const initialState = {
  datasetId: "",
  chartTitle: "",
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
  chartHistory: [],
};

/* 리듀서 선언 */
// 리듀서는 export default 로 작성합니다.
export default function DashboardChartView(state = initialState, action) {
  switch (action.type) {
    case SET_DATASET_ID:
      return {
        ...state,
        datasetId: action.data,
      };
    case SET_CHART_TITLE:
      return {
        ...state,
        chartTitle: action.data,
      };
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
    case SET_CHART_HISTORY:
      return {
        ...state,
        chartHistory: action.data,
      };
    default:
      return state;
  }
}
