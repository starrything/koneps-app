import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actionOfUser from "~/modules/global/actionOfUser";
import * as actionOfCode from "~/modules/global/actionOfCode";
import { Link, useHistory } from "react-router-dom";
import AxiosConfig from "~/AxiosConfig";
import _, { set } from "lodash";
import { isNotEmpty, isEmpty, checkValidToken } from "~/components/Utils";

const Main = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    checkValidToken();

    getRoleList();
    getUserList();
  }, []);

  const getRoleList = () => {
    AxiosConfig.get("/api/role/list")
      .then(function (response) {
        // success
        //setRoleOptions(response.data);
        let roleOptions = [];

        if (response.data !== undefined && response.data.length > 0) {
          response.data.forEach((element) => {
            roleOptions.push({
              value: element["role"],
              label: element["role"],
            });
          });
          //setRoleList(roleOptions);
          dispatch(actionOfCode.setCodeRole(roleOptions));
        }
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };

  const getUserList = () => {
    AxiosConfig.get("/api/user/list")
      .then(function (response) {
        // success
        let userOptions = [];
        response.data.forEach((element) => {
          userOptions.push({
            value: element["username"],
            label: element["firstName"] + " " + element["lastName"],
          });
        });
        // setUserList(userOptions);
        dispatch(actionOfUser.setAllUser(userOptions));
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              // className="d-flex align-items-center text-dark text-decoration-none"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="32"
                className="me-2"
                viewBox="0 0 118 94"
                role="img"
              >
                <title>Bootstrap</title>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="fs-4">Gov. SW Projects</span>
            </a>
            <ul className="nav nav-pills">
              <li>
                <a href="#" className="nav-link px-2 link-secondary">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-dark">
                  공고현황
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-dark">
                  사전규격공개
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-dark">
                  MeetUp
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-dark">
                  Links
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">공고현황</h1>
          <p className="col-md-8 fs-4">
            나라장터 입찰 공고현황을 조회할 수 있습니다.
            <br />
            소프트웨어 사업자 대상 프로젝트를 검색할 수 있습니다.
            <br />
            전일 기준 신규 공고 건 : 00
            <br />
            전일 기준 최근 한달 유효 공고 건 : 00
          </p>
          <button className="btn btn-primary btn-lg" type="button">
            Example button
          </button>
        </div>
      </div>

      <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <div className="h-100 p-5 text-white bg-dark rounded-3">
            <h2>사전규격공개</h2>
            <p>
              나라장터 사전규격공개 내용을 조회할 수 있습니다.
              <br />
              전일 기준 신규 공개 건 : 00
              <br />
              전일 기누 최근 한달 유효 건 : 00
            </p>
            <button className="btn btn-outline-light" type="button">
              Example button
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 bg-light border rounded-3">
            <h2>Links</h2>
            <p>
              정부 지원 관련 페이지와 창업 관련 페이지를 모아두었습니다.
              <br />
              필요한 분들은 확인하시고 즐겨찾기 추가해보세요.
            </p>
            <button className="btn btn-outline-secondary" type="button">
              Example button
            </button>
          </div>
        </div>
      </div>

      <footer className="pt-3 mt-4 text-muted border-top">© 2021</footer>
    </div>
  );
};

export default Main;
