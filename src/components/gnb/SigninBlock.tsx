import React, { useContext, useState, useEffect, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { ReducerType, resetStore, initStore } from "@modules/index";
import { Button, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

interface Props {
  signinYn: boolean;
}
const SigninBlock: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  // Description: 로그인 후 개인 메뉴 기능 (아이콘 드랍다운 메뉴)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signout = () => {
    // 1. clear redux store
    dispatch(initStore());
    // 2. clear browser Local storage
    global.localStorage.clear();

    handleClose();
  };

  if (props.signinYn) {
    return (
      <div style={{ padding: "5px" }}>
        <IconButton
          sx={{ my: 1, mx: 1, color: "white" }}
          aria-label="my profile"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Box component="span" m={1} color={"teal"}>
            Security
          </Box>
          <MenuItem onClick={handleClose}>Users</MenuItem>
          <MenuItem onClick={handleClose}>Roles</MenuItem>
          <Divider />
          <Box component="span" m={1} color={"teal"}>
            User
          </Box>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={() => signout()}>Signout</MenuItem>
        </Menu>
      </div>
    );
  } else {
    return (
      <div>
        <Button
          color="inherit"
          variant="outlined"
          size="small"
          sx={{ my: 2, mx: 1 }}
          component={Link}
          to={"/login"}
        >
          Log in
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          size="small"
          sx={{ my: 2, mx: 1 }}
          component={Link}
          to={"/signup"}
        >
          Sign Up
        </Button>
      </div>
    );
  }
};

export default SigninBlock;
