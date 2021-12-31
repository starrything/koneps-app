import React from "react";
import { connect } from "react-redux";
import { resetStore } from "~/modules/index";

import FiltersConfiguation from "~/pages/chart/make-chart/filters-conf/FiltersConfiguration";

class QueryOfFilterBox extends React.Component {
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
        <FiltersConfiguation />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryOfFilterBox);
