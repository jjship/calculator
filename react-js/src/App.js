import React from "react";
import Keyboard from "./Components/Keyboard";
import { Display } from "./Components/Display";
import "./app.css";
import "./grid.css";

function App() {
  return (
    <div className="wrapper" id="wrapper">
      <Display />
      <Keyboard />
    </div>
  );
}

export default App;
