import React from "react";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";

import QuerySingleSeries from "./query-functions/QuerySingleSeries";
import QueryEntity from "./query-functions/QueryEntity";
import QueryXaxis from "./query-functions/QueryXaxis";
import QueryYaxis from "./query-functions/QueryYaxis";
import QueryBubbleSize from "./query-functions/QueryBubbleSize";
import QueryFilters from "./query-functions/QueryFilters";
import QueryMaxBubbleSize from "./query-functions/QueryMaxBubbleSize";

class QueryOfBubbleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: "",
      fields: {},
      errors: {},
    };
  }

  /**
   * Add event listener
   */
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.datasetSpecList !== this.props.datasetSpecList) {
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {}

  render() {
    return (
      <div>
        <div className="row">
          <QuerySingleSeries />
          <QueryEntity />
        </div>
        <QueryBubbleSize />
        <QueryXaxis />
        <QueryYaxis />
        <QueryFilters />
        <QueryMaxBubbleSize />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryOfBubbleChart);
