import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { App } from "./App";
import "./index.css";
ReactDOM.render(
  <HashRouter>
    <SnackbarProvider maxSnack={5}>
      <App />
    </SnackbarProvider>
  </HashRouter>,
  document.getElementById("root")
);
