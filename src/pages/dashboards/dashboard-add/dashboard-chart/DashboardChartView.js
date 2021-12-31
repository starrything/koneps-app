import React, { useState, useEffect, useRef } from "react";
import AxiosConfig from "~/utils/AxiosConfig";
import { useSelector, useDispatch } from "react-redux";
import * as chart from "~/modules/chart/datasetAndChartType";
import * as actions from "~/modules/dashboard/dashboardChartView";
import * as actionOfBigNumber from "~/modules/chart/actionOfBigNumber";

// Data visualization by chart type
import CanvasOfTable from "~/pages/chart/make-chart/canvas/CanvasOfTable";
import CanvasOfTableQuery from "~/pages/chart/make-chart/canvas/CanvasOfTableQuery";
import CanvasOfLineChart from "~/pages/chart/make-chart/canvas/CanvasOfLineChart";
import CanvasOfLineChartQuery from "~/pages/chart/make-chart/canvas/CanvasOfLineChartQuery";
import CanvasOfBarChart from "~/pages/chart/make-chart/canvas/CanvasOfBarChart";
import CanvasOfBarChartQuery from "~/pages/chart/make-chart/canvas/CanvasOfBarChartQuery";
import CanvasOfPieChart from "~/pages/chart/make-chart/canvas/CanvasOfPieChart";
import CanvasOfPieChartQuery from "~/pages/chart/make-chart/canvas/CanvasOfPieChartQuery";
import CanvasOfBubbleChart from "~/pages/chart/make-chart/canvas/CanvasOfBubbleChart";
import CanvasOfBubbleChartQuery from "~/pages/chart/make-chart/canvas/CanvasOfBubbleChartQuery";
import CanvasOfBigNumber from "~/pages/chart/make-chart/canvas/CanvasOfBigNumber";
import CanvasOfBigNumberQuery from "~/pages/chart/make-chart/canvas/CanvasOfBigNumberQuery";
import CanvasOfFilterBox from "~/pages/chart/make-chart/canvas/CanvasOfFilterBox";
import CanvasOfFilterBoxQuery from "~/pages/chart/make-chart/canvas/CanvasOfFilterBoxQuery";

const DashboardChartView = (props) => {
  const dispatch = useDispatch();
  const [chartId, setChartId] = useState(props.chartId);
  const [chartType, setChartType] = useState(props.chartType);
  const [chartTitle, setChartTitle] = useState("");

  useEffect(() => {
    drawChart();
  }, []);

  const drawChart = () => {
    //   TODO: draw chart by type
    AxiosConfig.get("/api/chart/spec", {
      params: {
        chartId: chartId,
      },
    })
      .then(function (response) {
        // success
        const spec = response.data;
        setChartTitle(spec.chartTitle);
        dispatch(chart.setCanvasMode("view"));

        // TODO: 1. set redux dataset by chart Type
        dispatch(actions.setDatasetId(spec.datasetId));
        dispatch(actions.setChartTitle(spec.chartTitle));

        dispatch(actions.setTimeColumn(spec.timeColumn));
        dispatch(actions.setTimeGrain(spec.timeGrain));
        dispatch(actions.setTimeRange(spec.timeRange));

        dispatch(actions.setQueryColumns(spec.queryColumns));
        dispatch(actions.setQueryOrdering(spec.queryOrdering));
        dispatch(actions.setQueryRowLimit(spec.queryRowLimit));
        dispatch(actions.setQueryFilters(spec.queryFilters));
        dispatch(actions.setQueryMetric(spec.queryMetric));
        dispatch(actions.setQueryMetrics(spec.queryMetrics));
        dispatch(actions.setQueryGroupBy(spec.queryGroupBy));
        dispatch(actions.setQuerySeries(spec.querySeries));
        dispatch(actions.setQuerySingleSeries(spec.querySingleSeries));
        dispatch(actions.setQueryEntity(spec.queryEntity));

        dispatch(actions.setQueryXaxis(spec.queryXaxis));
        dispatch(actions.setQueryYaxis(spec.queryYaxis));
        dispatch(actions.setQueryBubbleSize(spec.queryBubbleSize));
        dispatch(actions.setQueryMaxBubbleSize(spec.queryMaxBubbleSize));
        dispatch(actions.setOptionsNumberFormat(spec.optionsNumberFormat));
        dispatch(actions.setFiltersConfiguation(spec.filtersConfiguration));

        // TODO: 2. query & draw
        queryOfChart();
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };

  const setQueryOfChart = (newQuery) => {
    queryOfChart = newQuery;
  };
  function queryOfChart() {}

  let canvasOfChart;
  let canvasOfChartQuery;
  if (chartType === "table") {
    canvasOfChart = <CanvasOfTable canvasMode="view" index={props.index} />;
    canvasOfChartQuery = (
      <CanvasOfTableQuery
        canvasMode="view"
        index={props.index}
        setQueryOfChart={setQueryOfChart}
      />
    );
  } else if (chartType === "lineChart") {
    canvasOfChart = <CanvasOfLineChart canvasMode="view" index={props.index} />;
    canvasOfChartQuery = (
      <CanvasOfLineChartQuery
        canvasMode="view"
        index={props.index}
        setQueryOfChart={setQueryOfChart}
      />
    );
  } else if (chartType === "barChart") {
    canvasOfChart = <CanvasOfBarChart canvasMode="view" index={props.index} />;
    canvasOfChartQuery = (
      <CanvasOfBarChartQuery
        canvasMode="view"
        index={props.index}
        setQueryOfChart={setQueryOfChart}
      />
    );
  } else if (chartType === "pieChart") {
    canvasOfChart = <CanvasOfPieChart canvasMode="view" index={props.index} />;
    canvasOfChartQuery = (
      <CanvasOfPieChartQuery
        canvasMode="view"
        index={props.index}
        setQueryOfChart={setQueryOfChart}
      />
    );
  } else if (chartType === "bubbleChart") {
    canvasOfChart = (
      <CanvasOfBubbleChart canvasMode="view" index={props.index} />
    );
    canvasOfChartQuery = (
      <CanvasOfBubbleChartQuery
        canvasMode="view"
        index={props.index}
        setQueryOfChart={setQueryOfChart}
      />
    );
  } else if (chartType === "bigNumber") {
    canvasOfChart = <CanvasOfBigNumber canvasMode="view" index={props.index} />;
    canvasOfChartQuery = (
      <CanvasOfBigNumberQuery
        canvasMode="view"
        index={props.index}
        setQueryOfChart={setQueryOfChart}
        chartId={chartId}
      />
    );
  } else if (chartType === "filterBox") {
    canvasOfChart = <CanvasOfFilterBox canvasMode="view" index={props.index} />;
    canvasOfChartQuery = (
      <CanvasOfFilterBoxQuery
        canvasMode="view"
        setQueryOfChart={setQueryOfChart}
      />
    );
  }
  return (
    <div
      className="dashboard-chart-view"
      id={"dashboard-chart-view_" + props.index}
      style={{ height: "100%", padding: "10px" }}
    >
      <div
        className="chart-title"
        style={{ marginBottom: "5px", fontWeight: "bold" }}
      >
        {chartTitle}
      </div>
      {canvasOfChart}
      {canvasOfChartQuery}
    </div>
  );
};

export default DashboardChartView;
