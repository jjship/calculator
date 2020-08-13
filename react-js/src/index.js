import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./grid.css";

function Button(props) {
  return <button>{props.value}</button>;
}

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
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

  renderKeyboard(buttonsArr) {
    return this.state.buttons.map((button) => <Button value={button} />);
  }

  render() {
    return (
      <div className="keyboard">{this.renderKeyboard(this.state.buttons)}</div>
    );
  }
}

class Calculator extends React.Component {
  render() {
    return (
      <div className="wrapper" id="wrapper">
        <input type="text" className="display" value="0" disabled />
        <Keyboard />
      </div>
    );
  }
}

//===============================

ReactDOM.render(<Calculator />, document.getElementById("root"));
