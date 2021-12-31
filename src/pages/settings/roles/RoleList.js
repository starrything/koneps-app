import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AxiosConfig from "~/utils/AxiosConfig";
import { AgGridReact } from "ag-grid-react";
import { isNotEmpty } from "~/utils/Valid";
import ActionRenderer from "~/pages/settings/roles/RoleListActionRenderer";
import DeleteRoleModal from "~/pages/settings/roles/DeleteRoleModal";

const gridOptions = {
  // PROPERTIES
  // Objects like myRowData and myColDefs would be created in your application
  pagination: true,
  rowSelection: "single",
  isScrollLag: () => false,
};

const columnDefs = [
  // { headerName: "First Name", field: "firstName", hide: true },
  { headerName: "Action", field: "action", cellRenderer: "ActionRenderer" },
  {
    headerName: "Role Name",
    field: "role",
    sortable: true,
    width: "600",
  },
];

const RoleList = (props) => {
  let history = useHistory();
  const [rowData, setRowData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    searchRoleList();
  }, []);

  const onCellClicked = (params) => {
    setRole(params.data.role);
  };

  const onCellDoubleClicked = (params) => {
    // history.push("/users/detail");
  };

  const searchRoleList = () => {
    let keyword = "";
    if (searchKeyword) {
      keyword = searchKeyword;
    }

    AxiosConfig.get("/api/role/search", {
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
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="row align-items-start">
            <div className="input-group">
              <h5>List Roles</h5>
            </div>
          </div>
          <div className="row align-items-end">
            {/* <Link to="/roles/add" className="btn btn-success">
              + Add Role
            </Link> */}
          </div>
        </div>
      </div>
      <div className="container">
        {/* <!-- Grid Area --> */}
        <div className="container-fluid">
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: 600 }}
          >
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
      {/* <!-- Modal --> */}
      <DeleteRoleModal role={role} searchRoleList={searchRoleList} />
    </div>
  );
};

export default RoleList;
