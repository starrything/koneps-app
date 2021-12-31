import React from "react";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";

import QueryColumns from "./query-functions/QueryColumns";
import QueryOrdering from "./query-functions/QueryOrdering";
import QueryRowLimit from "./query-functions/QueryRowLimit";
import QueryFilters from "./query-functions/QueryFilters";

class QueryOfTable extends React.Component {
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
        <QueryColumns />
        <QueryOrdering />
        <QueryRowLimit />
        <QueryFilters />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryOfTable);
