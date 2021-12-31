import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AxiosConfig from "~/utils/AxiosConfig";

const Links = (props) => {
  const pps_signature = "/images/links/pps_signature_ko.png";
  const koneps_signature = "/images/links/koneps_signature_ko.png";
  const msi_signature = "/images/links/msi_signature_ko.png";
  const iitp_signature = "/images/links/iitp_signature_ko.png";
  const kosme_signature = "/images/links/kosme_signature_ko.png";
  return (
    <div style={{marginTop: "56px"}}>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-10 col-md-8 mx-auto">
            <h1 className="fw-light">Bookmarks</h1>
            <p className="lead text-muted">
              나라장터와 조달청 페이지를 비롯하여 소프트웨어 사업자에게 도움이
              되는 페이지들을 모아두고 있습니다.
              <br />
              과학기술정보통신부와 정보통신기획평가원을 방문하여 정책 방향과
              지원 사업들도 확인해보세요.
            </p>
          </div>
        </div>
      </section>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div className="col">
              <div className="card shadow-sm">
                <img
                  className="bd-placeholder-img card-img-top"
                  src={koneps_signature}
                  alt=""
                  width="100%"
                  height="225"
                />
                <div className="card-body">
                  <p className="card-text">
                    조달업무 전 과정을 온라인으로 처리하는 전자조달시스템으로
                    모든 공공기관의 입찰정보가 공고됩니다.
                    <br />
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          window.open("https://www.g2b.go.kr/index.jsp");
                        }}
                      >
                        Move
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <img
                  className="bd-placeholder-img card-img-top"
                  src={pps_signature}
                  alt=""
                  width="100%"
                  height="225"
                />
                <div className="card-body">
                  <p className="card-text">
                    조달청은 공공행정에 필요한 자원을 투명하고 효율적으로 조달,
                    관리합니다.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          window.open("https://www.pps.go.kr/kor/index.do");
                        }}
                      >
                        Move
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <img
                  className="bd-placeholder-img card-img-top"
                  src={iitp_signature}
                  alt=""
                  width="100%"
                  height="225"
                />
                <div className="card-body">
                  <p className="card-text">
                    ICT R&D 기획·평가·혁신을 통해 미래 성장동력을 창출하는
                    전문기관입니다.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          window.open("https://www.iitp.kr/main.it");
                        }}
                      >
                        Move
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <img
                  className="bd-placeholder-img card-img-top"
                  src={msi_signature}
                  alt=""
                  width="100%"
                  height="225"
                />
                <div className="card-body">
                  <p className="card-text">
                    과학기술정책의 수립·총괄·조정·평가 및 4차 산업혁명 정책 총괄하는 정부기관입니다.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          window.open("https://www.msit.go.kr/index.do");
                        }}
                      >
                        Move
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <img
                  className="bd-placeholder-img card-img-top"
                  src={kosme_signature}
                  alt=""
                  width="100%"
                  height="225"
                />
                <div className="card-body">
                  <p className="card-text">
                    중소벤처기업의 경쟁력을 강화하고 경영기반을 확충하여 국민경제 주역으로 육성을 지원합니다.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          window.open("http://kosmes.or.kr/sbc/SH/MAP/SHMAP001M0.do");
                        }}
                      >
                        Move
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Links;
