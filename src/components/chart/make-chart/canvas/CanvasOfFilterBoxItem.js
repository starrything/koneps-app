import React from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "~/modules/chart/actionOfFilterBox";
import _, { set } from "lodash";

function CanvasOfFilterBoxItem(props) {
  const dispatch = useDispatch();
  const condition = useSelector(
    (state) => state.actionOfFilterBox.filterBoxCondition
  );

  let filterBoxColumn = props.filterBoxColumn;
  let filterData = props.filterBoxData;
  const options = [];
  filterData.forEach((element) => {
    // console.log(element);
    let filterDataOption = {};
    filterDataOption = {
      value: element[filterBoxColumn],
      label: element[filterBoxColumn],
    };
    options.push(filterDataOption);
  });

  function handleChange(selectedOption) {
    // console.log(props.filterBoxColumn);
    // console.log(selectedOption.value);
    if (isNotEmpty(selectedOption)) {
      dispatch(
        actions.setFilterBoxCondition([
          ...condition,
          {
            column: props.filterBoxColumn,
            input: selectedOption.value,
            filter: "EQUALS",
          },
        ])
      );
    } else {
      dispatch(
        actions.setFilterBoxCondition(
          _.reject(condition, { column: props.filterBoxColumn })
        )
      );
    }
  }

  function isNotEmpty(str) {
    if (typeof str === "undefined" || str === null || str === "") return false;
    else return true;
  }

  return (
    <div
      className="row"
      style={{
        paddingBottom: 10,
      }}
    >
      <div className="col">
        {props.filterBoxLabel}
        <Select isClearable="true" options={options} onChange={handleChange} />
      </div>
    </div>
  );
}

export default CanvasOfFilterBoxItem;
