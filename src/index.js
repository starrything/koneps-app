import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import "~/styles/index.css";
import "~/styles/carousel.css";
import App from "~/App";
// import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "~/modules";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { LicenseManager } from "ag-grid-enterprise";
LicenseManager.setLicenseKey(
  "CompanyName=iljin cns,LicensedApplication=ijcns,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-013981,ExpiryDate=3_March_2022_[v2]_MTY0NjI2NTYwMDAwMA==79ca3f5c5621088302aec8ce6faf7207"
);
// var enterprise = require("@ag-grid-enterprise/core");
// enterprise.LicenseManager.setLicenseKey(
//  "CompanyName=iljin cns,LicensedApplication=ijcns,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-013981,ExpiryDate=3_March_2022_[v2]_MTY0NjI2NTYwMDAwMA==79ca3f5c5621088302aec8ce6faf7207"
// );

const middlewares = [logger];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const history = createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
