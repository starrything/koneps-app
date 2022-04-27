import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosConfig from "@utils/axiosConfig";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { ColDef, CellClickedEvent } from "ag-grid-community";
import ActionRenderer1 from "@pages/bidnotice/BidNoticeActionRenderer1";
import ActionRenderer2 from "@pages/bidnotice/BidNoticeActionRenderer2";
import ActionRenderer3 from "@pages/bidnotice/BidNoticeActionRenderer3";
import ActionRenderer4 from "@pages/bidnotice/BidNoticeActionRenderer4";
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
  { headerName: "공고일시", field: "bidNtceDt", sortable: true },
  {
    headerName: "입찰공고번호",
    field: "bidNtceNo",
    width: 150,
    sortable: true,
  },
  {
    headerName: "입찰공고명",
    field: "bidNtceNm",
    width: 400,
    cellStyle: {textAlign: 'left'},
    sortable: true,
  },
  {
    headerName: "공고기관코드",
    field: "ntceInsttCd",
    sortable: true,
    hide: true,
  },
  { headerName: "공고기관명", field: "ntceInsttNM", cellStyle: {textAlign: 'left'}, sortable: true },
  {
    headerName: "수요기관코드",
    field: "dminsttCd",
    sortable: true,
    hide: true,
  },
  { headerName: "수요기관명", field: "dminsttNm", cellStyle: {textAlign: 'left'}, sortable: true },
  {
    headerName: "예산금액",
    field: "asignBdgtAmt",
    width: 150,
    valueFormatter: currencyFormatter,
    cellClass: "ag-right-aligned-cell",
    sortable: true,
  },
  {
    headerName: "추정가격",
    field: "presmptPrce",
    width: 150,
    valueFormatter: currencyFormatter,
    cellClass: "ag-right-aligned-cell",
    sortable: true,
  },
  { headerName: "입찰방식", field: "bidMethdNm", width: 150, sortable: true },
  { headerName: "계약체결방법", field: "cntrctCnclsMthdNm", cellStyle: {textAlign: 'left'}, sortable: true },
  { headerName: "입찰마감일시", field: "bidClseDt", sortable: true },
  { headerName: "개찰일시", field: "opengDt", sortable: true },
  { headerName: "낙찰방법", field: "sucsfbidMthdNm", cellStyle: {textAlign: 'left'}, sortable: true },
  { headerName: "등록일시", field: "rgstDt", sortable: true },
  { headerName: "공고규격서1", field: "ntceSpecDocUrl1", width: 120, cellClass: "ag-middle-aligned-cell", cellRenderer: "ActionRenderer1" },
  { headerName: "공고규격파일명1", field: "ntceSpecFileNm1", hide: true },
  { headerName: "공고규격서2", field: "ntceSpecDocUrl2", width: 120, cellClass: "ag-middle-aligned-cell", cellRenderer: "ActionRenderer2" },
  { headerName: "공고규격파일명2", field: "ntceSpecFileNm2", hide: true },
  { headerName: "공고규격서3", field: "ntceSpecDocUrl3", width: 120, cellClass: "ag-middle-aligned-cell", cellRenderer: "ActionRenderer3" },
  { headerName: "공고규격파일명3", field: "ntceSpecFileNm3", hide: true },
  { headerName: "입찰공고상세", field: "bidNtceDtlUrl", width: 120, cellClass: "ag-middle-aligned-cell", cellRenderer: "ActionRenderer4" },
  { headerName: "입찰공고", field: "bidNtceUrl", hide: true },
];

const BidNotice = (props: any) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    bidNtceNo: "",
    bidNtceNm: "",
    ntceSpecDocUrl1: "",
    ntceSpecDocUrl2: "",
    ntceSpecDocUrl3: "",
    bidNtceDtlUrl: "",
    bidNtceUrl: "",
  });
  const [bidNtceNo, setBidNtceNo] = useState("");

  useEffect(() => {
    searchBidNoticeList();
  }, []);

  const onCellClicked = (params: CellClickedEvent) => {
    setBidNtceNo(params.data.bidNtceNo);
    setSelectedRow({
      bidNtceNo: params.data.bidNtceNo,
      bidNtceNm: params.data.bidNtceNm,
      ntceSpecDocUrl1: params.data.ntceSpecDocUrl1,
      ntceSpecDocUrl2: params.data.ntceSpecDocUrl2,
      ntceSpecDocUrl3: params.data.ntceSpecDocUrl3,
      bidNtceDtlUrl: params.data.bidNtceDtlUrl,
      bidNtceUrl: params.data.bidNtceUrl,
    });
  };

  const onCellDoubleClicked = (params: { data: { dashboardId: string; }; }) => {
    navigate("/dashboard/view/" + params.data.dashboardId);
  };

  const searchBidNoticeList = () => {
    let keyword = "";
    if (searchKeyword) {
      keyword = searchKeyword;
    }

    axiosConfig.get("/api/v1/g2b/bidnotice/search", {
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

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      searchBidNoticeList();
    }
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
            <Typography color="text.primary">입찰공고 검색</Typography>
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
                onKeyDown={handleKeyPress}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={searchBidNoticeList}
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
            frameworkComponents={{ ActionRenderer1, ActionRenderer2, ActionRenderer3, ActionRenderer4 }}
            onCellClicked={(params) => onCellClicked(params)}
          //onCellDoubleClicked={(params) => onCellDoubleClicked(params)}
          >
          </AgGridReact>
        </div>
      </div>
    </Box>
  );
};

export default BidNotice;
