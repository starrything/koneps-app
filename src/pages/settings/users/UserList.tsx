import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosConfig from "@utils/axiosConfig";
import { AgGridReact } from "ag-grid-react";
import { isNotEmpty } from "@utils/valid";
import ActionRenderer from "@pages/settings/users/UserListActionRenderer";
import DeleteUserModal from "@pages/settings/users/DeleteUserModal";
import { Container, Box } from "@mui/material";

const gridOptions = {
  // PROPERTIES
  // Objects like myRowData and myColDefs would be created in your application
  pagination: true,
  rowSelection: "single",
  isScrollLag: () => false,
};
const columnDefs = [
  // { headerName: "First Name", field: "firstName", hide: true },
  {
    headerName: "Action",
    field: "action",
    sortable: false,
    cellRenderer: "ActionRenderer",
  },
  {
    headerName: "First Name",
    field: "firstName",
    sortable: true,
  },
  {
    headerName: "Last Name",
    field: "lastName",
    sortable: true,
  },
  { headerName: "User Name", field: "username", sortable: true },
  { headerName: "Email", field: "email", sortable: true },
  { headerName: "Is Active?", field: "isActive", width: 150, sortable: true },
  { headerName: "Role", field: "role", sortable: true },
];

const UserList = (props: any) => {
  let nvigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rowData, setRowData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    searchUserList();
  }, []);

  const onCellClicked = (params: any) => {
    setUsername(params.data.username);
  };

  const onCellDoubleClicked = (params: any) => {
    // navigate("/users/detail");
  };

  const searchUserList = () => {
    let keyword = "";
    if (searchKeyword) {
      keyword = searchKeyword;
    }

    axiosConfig
      .get("/api/v1/user/search", {
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
      <Container>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="row align-items-start">
            <div className="input-group">
              <h5>List Users</h5>
            </div>
          </div>
          <div className="row align-items-end">
            <Link to="/security/user/add" className="btn btn-success">
              + Add User
            </Link>
          </div>
        </div>
      </Container>
      <Container>
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
              context={{handleOpen}}
            />
          </div>
        </div>
      </Container>
      {/* <!-- Modal --> */}
      <DeleteUserModal username={username} searchUserList={searchUserList} open={open} handleClose={handleClose} />
    </Box>
  );
};

export default UserList;
