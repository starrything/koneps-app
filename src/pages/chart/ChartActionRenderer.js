/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default (props) => {
  return (
    <div>
      <span>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#deleteChartModal"
        >
          <i className="bi bi-trash"></i>
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#updateDatabaseModal"
        >
          <i className="bi bi-pencil"></i>
          <span className="visually-hidden">Button</span>
        </button>
      </span>
    </div>
  );
};
