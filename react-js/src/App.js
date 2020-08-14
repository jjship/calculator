import React from "react";
import Keyboard from "./Components/Keyboard";
import "./app.css";
import "./grid.css";

function App() {
  return (
    <div className="wrapper" id="wrapper">
      <input type="text" className="display" value="0" disabled />
      <Keyboard />
    </div>
  );
}

export default App;
