import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetStore } from "~/modules/index";
import Menu from "./Menu";
import { isNotEmpty } from "~/utils/Valid";

const Gnb = (props) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.loginInfo.token);

  const gnbView = useSelector((state) => state.actionOfGlobal.gnbView);

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => dispatch(resetStore())}
        >
          KONEPS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link to="/overview" className="nav-link active">
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bidnotice/list" className="nav-link active">
                공고현황
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/beforespec/list" className="nav-link active">
                사전규격공개
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/meetup/list" className="nav-link active">
                MeetUp
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/links/list" className="nav-link active">
                Links
              </Link>
            </li>
            {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li> */}
          </ul>
          <form className="d-flex">
            {/* <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="button">
              Search
            </button> */}
            <Link to="/login" className="nav-link" style={{color: "white"}}>Sign In</Link>
            <Link to="/signup" className="btn btn-outline-light">Sign up</Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Gnb;
