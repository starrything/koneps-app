import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AxiosConfig from "~/utils/AxiosConfig";

const Overview = (props) => {
  return (
    <div className="container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <main className="px-3">
        <h1 className="mt-5">공공 소프트웨어 프로젝트를 둘러보세요!</h1>
        <br />
        <h3>공고현황</h3>
        <p className="lead">
          현재 접수중인 입찰공고를 확인하실 수 있습니다.
          <br />
          "입찰공고명"을 통해 어떤 사업인지 확인하실 수 있고 "수요기관"과
          "예산금액" 및 "추정가격" 등을 한눈에 확인할 수 있습니다.
          <br />
          마감일시를 확인하시어 늦지 않게 입찰에 참여해보세요!
        </p>
        <br />
        <h3>사전규격공개</h3>
        <p className="lead">
          입찰공고 전에 프로젝트의 요청규격서를 확인하실 수 있습니다.
          <br />
          "품명(사업명)"을 통해 어떤 사업인지 확인하실 수 있고 "수요기관"과
          "배정예산" 및 "납품기한일시" 등을 한눈에 확인할 수 있습니다.
          <br />
          의견등록 마감일시를 확인하시어 늦지 않게 해당 사전규격에 대해 의견을
          등록할 수 있습니다.
        </p>
        <br />
        <h3>MeetUp</h3>
        <p className="lead">
          공공 프로젝트에 입찰할 때 컨소시엄이 필요하면 밋업(MeetUp) 페이지에서
          네트워킹을 해보세요!
          <br />
          지속적인 협업을 통해 동반성장의 발판을 만들어나갈 수 있습니다.
        </p>
        <br />
        <h3>Links</h3>
        <p className="lead">
          나라장터를 포함하여 소프트웨어 프로젝트와 관련된 웹 페이지들의 링크를
          모아두었습니다.
          <br />
          또한 과기부 및 중기부에서 방문하여 현재 진행중인 정부지원 연구과제들도
          살펴보시기 바랍니다.
        </p>
      </main>
      <br />
      <footer class="container">
        <p class="float-end">
          <Link href="/overview">Back to top</Link>
        </p>
        <p>
          © 2021 Jonghyun, Inc. · <Link to="#">Privacy</Link> ·{" "}
          <Link href="#">Terms</Link>
        </p>
      </footer>
    </div>
  );
};

export default Overview;
