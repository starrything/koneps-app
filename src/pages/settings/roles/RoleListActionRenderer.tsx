/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default (props: any) => {
  const navigate = useNavigate();
  return (
    <div>
      <span>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#deleteRoleModal"
        >
          <i className="bi bi-trash"></i>
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => navigate("/roles/edit/" + props.data.role)}
        >
          <i className="bi bi-pencil"></i>
          <span className="visually-hidden">Button</span>
        </button>
      </span>
    </div>
  );
};
