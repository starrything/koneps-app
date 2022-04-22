import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosConfig from "@utils/axiosConfig";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { ColDef, CellClickedEvent } from "ag-grid-community";
import ActionRenderer1 from "@pages/beforespec/BeforeSpecActionRenderer1";
import ActionRenderer2 from "@pages/beforespec/BeforeSpecActionRenderer2";
import { currencyFormatter } from "@src/utils/formatter";
import { Container, Box, Breadcrumbs, Link, Typography } from "@mui/material";

const gridOptions = {
  // PROPERTIES
  // Objects like myRowData and myColDefs would be created in your application
  pagination: true,
  rowSelection: "single",
  isScrollLag: () => false,
};

const columnDefs: ColDef[] = [
  { headerName: "공개일시", field: "rcptDt", sortable: true },
  {
    headerName: "등록번호",
    field: "bfSpecRgstNo",
    width: 150,
    sortable: true,
  },
  {
    headerName: "품명(사업명)",
    field: "prdctClsfcNoNm",
    width: 400,
    sortable: true,
  },
  {
    headerName: "배정예산",
    field: "asignBdgtAmt",
    width: 150,
    valueFormatter: currencyFormatter,
    cellClass: "ag-right-aligned-cell",
    sortable: true,
  },
  { headerName: "의견등록 마감일시", field: "opninRgstClseDt", sortable: true },
  { headerName: "수요기관명", field: "rlDminsttNm", sortable: true },
  { headerName: "납품기한일시", field: "dlvrTmlmtDt", sortable: true },
  { headerName: "납품일수", field: "dlvrDaynum", width: 150, sortable: true },
  { headerName: "규격문서1", field: "specDocFileUrl1", width: 120, sortable: true, cellRenderer: "ActionRenderer1" },
  { headerName: "규격문서2", field: "specDocFileUrl2", width: 120, sortable: true, cellRenderer: "ActionRenderer2" },
];

const BeforeSpec = (props: any) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    beforeSpecRgstNo: "",
    prdctClsfcNoNm: "",
    specDocFileUrl1: "",
    specDocFileUrl2: "",
  });
  const [beforeSpecRgstNo, setBeforeSpecRgstNo] = useState("");

  useEffect(() => {
    searchBeforeSpecList();
  }, []);

  const onCellClicked = (params: CellClickedEvent) => {
    setBeforeSpecRgstNo(params.data.beforeSpecRgstNo);
    setSelectedRow({
      beforeSpecRgstNo: params.data.beforeSpecRgstNo,
      prdctClsfcNoNm: params.data.prdctClsfcNoNm,
      specDocFileUrl1: params.data.specDocFileUrl1,
      specDocFileUrl2: params.data.specDocFileUrl2,
    });
  };

  const onCellDoubleClicked = (params: { data: { dashboardId: string; }; }) => {
    navigate("/dashboard/view/" + params.data.dashboardId);
  };

  const searchBeforeSpecList = () => {
    let keyword = "";
    if (searchKeyword) {
      keyword = searchKeyword;
    }

    axiosConfig.get("/api/v1/g2b/beforespec/search", {
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
    <Box sx={{ pt: 8.5 }}>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-white shadow-sm"
        aria-label="Third navbar example"
      >
        <div className="container-fluid">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              KONEPS
            </Link>
            <Typography color="text.primary">사전규격 검색</Typography>
          </Breadcrumbs>
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
        <div className="ag-theme-alpine" style={{ width: "100%", height: 700 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            gridOptions={gridOptions}
            defaultColDef={{ resizable: true }}
            frameworkComponents={{ ActionRenderer1, ActionRenderer2 }}
            onCellClicked={(params) => onCellClicked(params)}
          //onCellDoubleClicked={(params) => onCellDoubleClicked(params)}
          >
          </AgGridReact>
        </div>
      </div>
    </Box>
  );
};

export default BeforeSpec;
