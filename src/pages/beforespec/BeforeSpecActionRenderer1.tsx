/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { isNotEmpty } from "@src/utils/valid";

export default (props: { value: string | URL | undefined; }) => {
  const downloadLink = props.value;
  const disp = isNotEmpty(downloadLink) ? "block" : "none";

  const downloadBfSpec = () => {
    console.log(props);
    console.log(props.value);
    window.open(props.value);
  }
  return (
    <div>
      <span style={{display:disp}}>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => downloadBfSpec()}
        >
          <i className="bi bi-file-earmark-text"></i>
          <span className="visually-hidden">Button</span>
        </button>
      </span>
    </div>
  );
};
