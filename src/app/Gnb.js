import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetStore } from "~/modules/index";
import Menu from "./Menu";
import { isNotEmpty } from "~/components/Utils";

const Gnb = (props) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.loginInfo.token);

  const gnbView = useSelector((state) => state.actionOfGlobal.gnbView);

  return (
    <nav
      className={"navbar navbar-expand-sm navbar-light bg-light collapse " + (gnbView === "show" ? "show" : "")}
      aria-label="Visual navbar"
      id="gnbNavbarComponent"
    >
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => dispatch(resetStore())}
        >
          Visual
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {isNotEmpty(token) ? <Menu /> : ""}
      </div>
    </nav>
  );
};

export default Gnb;
