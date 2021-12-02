import React, { useState, useEffect } from "react";
import { BuilderTabComponent } from "./BuilderTabComponent";
import { BuilderTabChart } from "./BuilderTabChart";

const BuilderTabContent = (props) => {
  return (
    <div className="tab-conent" style={{ width: "100%" }}>
      <BuilderTabComponent displayTab={props.displayTab} />
      <BuilderTabChart displayTab={props.displayTab} />
    </div>
  );
};

export default BuilderTabContent;
