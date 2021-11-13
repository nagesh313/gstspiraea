import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { App } from "./App";
import "./index.css";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <SnackbarProvider maxSnack={5}>
        <App />
      </SnackbarProvider>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
