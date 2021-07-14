import React, { Component } from "react";
import ReactDOM from "react-dom";
import Popular from "./component/Popular";
import "./index.css";

export default class App extends Component {
  
  render() {
    return (
      <div className='container'>
        <Popular />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
