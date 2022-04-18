import React, { useContext, useState, useEffect, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { ReducerType, resetStore, initStore } from "@modules/index";
import {
  alpha,
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  styled,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SigninBlock from "@components/gnb/SigninBlock";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Gnb = (props: any) => {
  const dispatch = useDispatch();
  const [signinYn, setSigninYn] = useState<boolean>(false);
  let storedSession = useSelector((state: RootStateOrAny) => state.session.loginInfo);

  useEffect(() => {
    // for SigninBlock display & hidden
    console.log("Changed session...!")
    console.log(storedSession);
    if (storedSession.loginId) {
      console.log("useEffect: true");
      setSigninYn(true);
    } else {
      console.log("useEffect: false");
      setSigninYn(false);
    }
  }, [storedSession]);

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          bgcolor: "text.primary",
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          {/* TODO: Icon  */}
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => dispatch(resetStore())}
            >
              KONEPS
            </Link>
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to={"/overview"}
            >
              Overview
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to={"/beforespec/list"}
            >
              사전규격
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to={"/bidnotice/list"}
            >
              공고현황
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to={"/meetup/list"}
            >
              MeetUp
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to={"/bookmark/list"}
            >
              Bookmark
            </Button>
            <SigninBlock signinYn={signinYn} />
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Gnb;
