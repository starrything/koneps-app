import React, { useState, useEffect } from "react";

export const BuilderTabComponent = (props) => {
  function dragThis(event) {
    event.dataTransfer.setData("builder", event.target.id);
  }
  return (
    <div
      className="tab-pane fade show active"
      id="componentTab"
      role="tabpanel"
      aria-labelledby="component-tab"
    >
      <div
        style={{
          padding: "5px",
          display: props.displayTab === "component" ? "block" : "none",
        }}
      >
        <div className="row">
          <div
            className="col new-component"
            draggable="true"
            style={{
              width: "100%",
              height: "72px",
              padding: "16px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "center",
              cursor: "move",
              backgroundColor: "white",
            }}
            id="new-component-header"
            onDragStart={dragThis}
          >
            <img
              src="/images/dashboard/header.png"
              alt="header"
              className="img-thumbnail"
              style={{ marginRight: "16px" }}
              draggable="false"
            />
            Header
          </div>
        </div>
        <div className="row">
          <div
            className="col new-component"
            style={{
              width: "100%",
              height: "72px",
              padding: "16px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "center",
              cursor: "move",
              backgroundColor: "white",
            }}
            draggable="true"
            id="new-component-divider"
            onDragStart={dragThis}
          >
            <img
              src="/images/dashboard/minus.png"
              alt="divider"
              className="img-thumbnail"
              style={{ marginRight: "16px" }}
              draggable="false"
            />
            Divider
          </div>
        </div>
      </div>
    </div>
  );
};
