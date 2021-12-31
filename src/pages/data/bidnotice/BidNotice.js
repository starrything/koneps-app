import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AxiosConfig from "~/utils/AxiosConfig";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import ActionRenderer1 from "~/pages/data/bidnotice/BidNoticeActionRenderer1";
import ActionRenderer2 from "~/pages/data/bidnotice/BidNoticeActionRenderer2";
import ActionRenderer3 from "~/pages/data/bidnotice/BidNoticeActionRenderer3";
import ActionRenderer4 from "~/pages/data/bidnotice/BidNoticeActionRenderer4";

const gridOptions = {
  // PROPERTIES
  // Objects like myRowData and myColDefs would be created in your application
  pagination: true,
  rowSelection: "single",
  isScrollLag: () => false,
};

function currencyFormatter(params) {
  // return '\xA3' + formatNumber(params.value);
  return formatNumber(params.value);
}
function formatNumber(number) {
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const columnDefs = [
  { headerName: "공고일시", field: "bidNtceDt", sortable: true },
  {
    headerName: "입찰공고번호",
    field: "bidNtceNo",
    width: "150",
    sortable: true,
  },
  {
    headerName: "입찰공고명",
    field: "bidNtceNm",
    width: "400",
    sortable: true,
  },
  {
    headerName: "공고기관코드",
    field: "ntceInsttCd",
    sortable: true,
    hide: true,
  },
  { headerName: "공고기관명", field: "ntceInsttNM", sortable: true },
  {
    headerName: "수요기관코드",
    field: "dminsttCd",
    sortable: true,
    hide: true,
  },
  { headerName: "수요기관명", field: "dminsttNm", sortable: true },
  {
    headerName: "예산금액",
    field: "asignBdgtAmt",
    width: "150",
    valueFormatter: currencyFormatter,
    cellClass: "ag-right-aligned-cell",
    sortable: true,
  },
  {
    headerName: "추정가격",
    field: "presmptPrce",
    width: "150",
    valueFormatter: currencyFormatter,
    cellClass: "ag-right-aligned-cell",
    sortable: true,
  },
  { headerName: "입찰방식", field: "bidMethdNm", width: "150", sortable: true },
  { headerName: "계약체결방법", field: "cntrctCnclsMthdNm", sortable: true },
  { headerName: "입찰마감일시", field: "bidClseDt", sortable: true },
  { headerName: "개찰일시", field: "opengDt", sortable: true },
  { headerName: "낙찰방법", field: "sucsfbidMthdNm", sortable: true },
  { headerName: "등록일시", field: "rgstDt", sortable: true },
];

const BidNotice = (props) => {
  let history = useHistory();
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

  const onCellClicked = (params) => {
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

  const onCellDoubleClicked = (params) => {
    history.push("/dashboard/view/" + params.data.dashboardId);
  };

  const searchBidNoticeList = () => {
    let keyword = "";
    if (searchKeyword) {
      keyword = searchKeyword;
    }

    AxiosConfig.get("/api/g2b/bidnotice/search", {
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
            입찰공고 검색
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
            //columnDefs={columnDefs}
            gridOptions={gridOptions}
            defaultColDef={{ resizable: true }}
            frameworkComponents={{ ActionRenderer1, ActionRenderer2, ActionRenderer3, ActionRenderer4 }}
            onCellClicked={(params) => onCellClicked(params)}
            //onCellDoubleClicked={(params) => onCellDoubleClicked(params)}
          >
            <AgGridColumn
              field="bidNtceDt"
              headerName="공고일시"
              sortable="true"
            />
            <AgGridColumn
              field="bidNtceNo"
              headerName="입찰공고번호"
              sortable="true"
              width="150"
            />
            <AgGridColumn
              field="bidNtceNm"
              headerName="입찰공고명"
              sortable="true"
              width="400"
            />
            <AgGridColumn
              field="ntceInsttCd"
              headerName="공고기관코드"
              sortable="true"
              hide="true"
            />
            <AgGridColumn
              field="ntceInsttNM"
              headerName="공고기관명"
              sortable="true"
            />
            <AgGridColumn
              field="dminsttCd"
              headerName="수요기관코드"
              sortable="true"
              hide="true"
            />
            <AgGridColumn
              field="dminsttNm"
              headerName="수요기관명"
              sortable="true"
            />
            <AgGridColumn
              field="asignBdgtAmt"
              headerName="예산금액"
              sortable="true"
              width="150"
              valueFormatter={currencyFormatter}
              cellClass="ag-right-aligned-cell"
            />
            <AgGridColumn
              field="presmptPrce"
              headerName="추정가격"
              sortable="true"
              width="150"
              valueFormatter={currencyFormatter}
              cellClass="ag-right-aligned-cell"
            />
            <AgGridColumn
              field="bidMethdNm"
              headerName="입찰방식"
              sortable="true"
              width="150"
            />
            <AgGridColumn
              field="cntrctCnclsMthdNm"
              headerName="계약체결방법"
              sortable="true"
            />
            <AgGridColumn
              field="bidClseDt"
              headerName="입찰마감일시"
              sortable="true"
            />
            <AgGridColumn
              field="opengDt"
              headerName="개찰일시"
              sortable="true"
            />
            <AgGridColumn
              field="sucsfbidMthdNm"
              headerName="낙찰방법"
              sortable="true"
            />
            <AgGridColumn
              field="rgstDt"
              headerName="등록일시"
              sortable="true"
            />
            <AgGridColumn
              field="ntceSpecDocUrl1"
              headerName="공고규격서1"
              cellRenderer="ActionRenderer1"
              width="120"
              cellClass="ag-middle-aligned-cell"
            />
            <AgGridColumn
              field="ntceSpecFileNm1"
              headerName="공고규격파일명1"
              hide="true"
            />
            <AgGridColumn
              field="ntceSpecDocUrl2"
              headerName="공고규격서2"
              cellRenderer="ActionRenderer2"
              width="120"
            />
            <AgGridColumn
              field="ntceSpecFileNm2"
              headerName="공고규격파일명2"
              hide="true"
            />
            <AgGridColumn
              field="ntceSpecDocUrl3"
              headerName="공고규격서3"
              cellRenderer="ActionRenderer3"
              width="120"
              cellClass="ag-middle-aligned-cell"
            />
            <AgGridColumn
              field="ntceSpecFileNm3"
              headerName="공고규격파일명3"
              hide="true"
            />
            <AgGridColumn
              field="bidNtceDtlUrl"
              headerName="입찰공고상세"
              cellRenderer="ActionRenderer4"
              width="120"
            />
            <AgGridColumn
              field="bidNtceUrl"
              headerName="입찰공고"
              cellRenderer="ActionRenderer4"
              width="120"
              hide="true"
            />
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default BidNotice;
