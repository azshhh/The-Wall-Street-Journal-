import React, { Component } from "react";
import loading from "./loading.gif";

export class Spinner extends Component {
  render() {
    return (
      <div>
        <img className="my-3" src={loading} alt="loading..." />
      </div>
    );
  }
}

export default Spinner;
