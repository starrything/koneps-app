/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip, { TooltipProps } from "react-bootstrap/Tooltip";
import { isNotEmpty } from "@src/utils/valid";

export default (props: { value: string | URL | undefined; data: { ntceSpecFileNm3: any; }; }) => {
  const downloadLink = props.value;
  const disp = isNotEmpty(downloadLink) ? "block" : "none";
  let text = props.data.ntceSpecFileNm3;

  const downloadSpecDoc = () => {
    console.log(props);
    // console.log(props.value);
    // console.log(props.value.length);
    window.open(props.value);
  };

  const renderInfo = (props: JSX.IntrinsicAttributes & TooltipProps & React.RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );
  return (
    <div>
      <span style={{ display: disp }}>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 250 }}
          overlay={renderInfo}
        >
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => downloadSpecDoc()}
          >
            <i className="bi bi-file-earmark-text"></i>
            <span className="visually-hidden">Button</span>
          </button>
        </OverlayTrigger>
      </span>
    </div>
  );
};
