import React from "react";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";

import QueryGroupBy from "./query-functions/QueryGroupBy";
import QueryMetric from "./query-functions/QueryMetric";
import QueryFilters from "./query-functions/QueryFilters";
import QueryRowLimit from "./query-functions/QueryRowLimit";

class QueryOfPieChart extends React.Component {
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
        <QueryGroupBy />
        <QueryMetric />
        <QueryFilters />
        <QueryRowLimit />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryOfPieChart);
