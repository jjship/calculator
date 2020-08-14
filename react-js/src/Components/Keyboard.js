import React from "react";
import { Button } from "./Button";

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
    return buttonsArr.map((button) => <Button value={button} />);
  }

  render() {
    return (
      <div className="keyboard">{this.renderKeyboard(this.state.buttons)}</div>
    );
  }
}

export default Keyboard;
