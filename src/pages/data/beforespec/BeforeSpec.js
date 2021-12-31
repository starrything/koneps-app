import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AxiosConfig from "~/utils/AxiosConfig";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import ActionRenderer1 from "~/pages/data/beforespec/BeforeSpecActionRenderer1";

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
  { headerName: "공개일시", field: "rcptDt", sortable: true },
  {
    headerName: "등록번호",
    field: "bfSpecRgstNo",
    width: "150",
    sortable: true,
  },
  {
    headerName: "품명(사업명)",
    field: "prdctClsfcNoNm",
    width: "400",
    sortable: true,
  },
  {
    headerName: "배정예산",
    field: "asignBdgtAmt",
    width: "150",
    valueFormatter: currencyFormatter,
    cellClass: "ag-right-aligned-cell",
    sortable: true,
  },
  { headerName: "의견등록 마감일시", field: "opninRgstClseDt", sortable: true },
  { headerName: "수요기관명", field: "rlDminsttNm", sortable: true },
  { headerName: "납품기한일시", field: "dlvrTmlmtDt", sortable: true },
  { headerName: "납품일수", field: "dlvrDaynum", width: "150", sortable: true },
  {
    headerName: "규격문서1",
    field: "specDocFileUrl1",
    width: "150",
    sortable: true,
  },
  {
    headerName: "규격문서2",
    field: "specDocFileUrl2",
    width: "150",
    sortable: true,
  },
];

const BeforeSpec = (props) => {
  let history = useHistory();
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

  const onCellClicked = (params) => {
    setBeforeSpecRgstNo(params.data.beforeSpecRgstNo);
    setSelectedRow({
      beforeSpecRgstNo: params.data.beforeSpecRgstNo,
      prdctClsfcNoNm: params.data.prdctClsfcNoNm,
      specDocFileUrl1: params.data.specDocFileUrl1,
      specDocFileUrl2: params.data.specDocFileUrl2,
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

    AxiosConfig.get("/api/g2b/beforespec/search", {
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
        <div className="ag-theme-alpine" style={{ width: "100%", height: 700 }}>
          <AgGridReact
            rowData={rowData}
            //columnDefs={columnDefs}
            gridOptions={gridOptions}
            defaultColDef={{ resizable: true }}
            frameworkComponents={{ ActionRenderer1 }}
            onCellClicked={(params) => onCellClicked(params)}
            //onCellDoubleClicked={(params) => onCellDoubleClicked(params)}
          >
            <AgGridColumn
              field="rcptDt"
              headerName="공개일시"
              sortable="true"
            />
            <AgGridColumn
              field="bfSpecRgstNo"
              headerName="등록번호"
              width="150"
              sortable="true"
            />
            <AgGridColumn
              field="prdctClsfcNoNm"
              headerName="품명(사업명)"
              width="400"
              sortable="true"
            />
            <AgGridColumn
              field="asignBdgtAmt"
              headerName="배정예산"
              width="150"
              valueFormatter={currencyFormatter}
              cellClass="ag-right-aligned-cell"
              sortable="true"
            />
            <AgGridColumn
              field="opninRgstClseDt"
              headerName="의견등록 마감일시"
              sortable="true"
            />
            <AgGridColumn
              field="rlDminsttNm"
              headerName="수요기관명"
              sortable="true"
            />
            <AgGridColumn
              field="dlvrTmlmtDt"
              headerName="납품기한일시"
              sortable="true"
            />
            <AgGridColumn
              field="dlvrDaynum"
              headerName="납품일수"
              width="150"
              sortable="true"
            />
            <AgGridColumn
              field="specDocFileUrl1"
              headerName="규격문서1"
              cellRenderer="ActionRenderer1"
              width="120"
              cellClass="ag-middle-aligned-cell"
            />
            <AgGridColumn
              field="specDocFileUrl2"
              headerName="규격문서2"
              cellRenderer="ActionRenderer1"
              width="120"
            />
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default BeforeSpec;
