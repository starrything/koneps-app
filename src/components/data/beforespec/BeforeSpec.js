import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AxiosConfig from "~/AxiosConfig";
import { AgGridReact } from "ag-grid-react";
import ActionRenderer from "~/components/dashboards/DashboardActionRenderer";

const gridOptions = {
  // PROPERTIES
  // Objects like myRowData and myColDefs would be created in your application
  pagination: true,
  rowSelection: "single",
  isScrollLag: () => false,
};

const columnDefs = [
  { headerName: "Dashboard Id", field: "dashboardId", hide: true },
  {
    headerName: "Title",
    field: "dashboardTitle",
    width: "300",
    sortable: true,
  },
  { headerName: "Status", field: "status", sortable: true },
  { headerName: "Modified By", field: "modifiedBy", sortable: true },
  { headerName: "Last Modified", field: "modifiedDate", sortable: true },
  { headerName: "Created By", field: "createdBy", sortable: true },
  { headerName: "Action", field: "action", cellRenderer: "ActionRenderer" },
];

const BeforeSpec = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    dashboardId: "",
    dashboardTitle: "",
  });
  const [beforeSpecRgstNo, setBeforeSpecRgstNo] = useState("");

  const onCellClicked = (params) => {
    setBeforeSpecRgstNo(params.data.beforeSpecRgstNo);
    setSelectedRow({
      beforeSpecRgstNo: params.data.beforeSpecRgstNo,
      prdctClsfcNoNm: params.data.prdctClsfcNoNm,
    });
  };

  const onCellDoubleClicked = (params) => {
    history.push("/dashboard/view/" + params.data.dashboardId);
  };

  const searchBeforeSpecList = () => {
    let keyword = "";
    if (searchKeyword) {
      keyword = searchKeyword;
    }

    AxiosConfig.get("/api/dashboard/search", {
      params: {
        keyword: keyword,
      },
    })
      .then(function (response) {
        // success
        setRowData(response.data);
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-white shadow-sm"
        aria-label="Third navbar example"
      >
        <div className="container-fluid">
          <Link to="#" className="navbar-brand">
            사전규격 검색
          </Link>
          <div className="collapse navbar-collapse" id="navbarsExample03">
            <ul className="navbar-nav me-auto mb-2 mb-sm-0"></ul>
            <form className="d-flex">
              {/* <Link
                to="/dashboard/add"
                className="btn btn-success"
                onClick={() => dispatch(actions.setDashboardMode("edit"))}
              >
                Button Name
              </Link> */}
            </form>
          </div>
        </div>
      </nav>
      {/* <!-- Search --> */}
      <div className="container-fluid">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="row align-items-start">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search keyword"
                aria-describedby="button-addon2"
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                }}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={searchBeforeSpecList}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Grid Area --> */}
      <div className="container-fluid">
        <div className="ag-theme-alpine" style={{ width: "100%", height: 500 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            gridOptions={gridOptions}
            defaultColDef={{ resizable: true }}
            frameworkComponents={{ ActionRenderer }}
            onCellClicked={(params) => onCellClicked(params)}
            onCellDoubleClicked={(params) => onCellDoubleClicked(params)}
          />
        </div>
      </div>
    </div>
  );
};

export default BeforeSpec;
