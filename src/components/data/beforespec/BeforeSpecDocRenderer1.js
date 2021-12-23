/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default (props) => {
  const downloadLink = props.value;
  const disp = downloadLink.length > 0 ? "block" : "none";

  const downloadBfSpec1 = () => {
    console.log(props);
    console.log(props.value);
    console.log(props.value.length);
    window.open(props.value);
  }
  return (
    <div>
      <span style={{display:disp}}>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => downloadBfSpec1()}
        >
          <i className="bi bi-file-earmark-text"></i>
          <span className="visually-hidden">Button</span>
        </button>
      </span>
    </div>
  );
};
