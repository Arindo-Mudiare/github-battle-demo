import React, { Component } from "react";
import ReactDOM from "react-dom";
import Battle from "./component/Battle";
import Popular from "./component/Popular";
import "./index.css";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Battle />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
