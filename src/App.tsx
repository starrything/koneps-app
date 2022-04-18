import React, { useState, useEffect } from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "@src/modules";
import logger from "redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { SessionContext, getCookie, setCookie } from "@utils/cookies";

import "@styles/App.css";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import Gnb from "@src/components/gnb/Gnb";
import Router from "@components/Router";
import Footer from "@components/Footer";

const middlewares = [logger];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const history = createBrowserHistory();

const App = (props: any) => {
  const [cookieSession, setCookieSession] = useState(getCookie("session"));
  useEffect(() => {
    setCookie("session", getCookie("session"));
  }, [cookieSession]);

  return (
    <div className="App">
      <SessionContext.Provider value={cookieSession}>
        <BrowserRouter>
          <Provider store={store}>
              <Gnb />
              <Router />
            <Footer />
          </Provider>
        </BrowserRouter>
      </SessionContext.Provider>
    </div>
  );
};

export default App;
