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
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <Link
            to="/"
            className="navbar-brand"
            onClick={() => dispatch(resetStore())}
          >
            KONEPS
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item">
                <Link to="#" className="nav-link active">
                  Overview
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/bidnotice/list" className="nav-link active">
                  공고현황
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/beforespec/list" className="nav-link active">
                  사전규격공개
                </Link>
              </li>
              <li class="nav-item">
                <Link to="#" className="nav-link active">
                  MeetUp
                </Link>
              </li>
              <li class="nav-item">
                <Link to="#" className="nav-link active">
                  Links
                </Link>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link" href="#">
                  Link
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
              </li> */}
            </ul>
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Gnb;
