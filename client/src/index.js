import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./Routes";
import Settings from './components/SettingsMenu/Settings';

ReactDOM.render(
  <React.StrictMode>
    <Settings />
    <Router>
      <Routes />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./Routes";

ReactDOM.render(
  <React.StrictMode>
    <div className="app">
      <Router>
        <Routes />
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
