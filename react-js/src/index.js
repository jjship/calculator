import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./grid.css";

function Button(props) {
  return <button className={props.kind}>{props.value}</button>;
}

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        ".",
        "/",
        "*",
        "-",
        "=",
        "+",
        "C",
        "AC",
      ],
    };
  }
}
