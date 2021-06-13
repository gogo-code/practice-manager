import React, { Component } from "react";
import home from "./../layouts/images/home.png";

export default class index extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${home})`,
          height: "100%",
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: " center center",
          backgroundSize:"contain"
        }}
      ></div>
    );
  }
}
