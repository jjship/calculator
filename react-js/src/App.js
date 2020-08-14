import React from "react";
import Keyboard from "./Components/Keyboard";
import { Input } from "./Components/Input";
import "./app.css";
import "./grid.css";

function App() {
  return (
    <div className="wrapper" id="wrapper">
      <Input />
      <Keyboard />
    </div>
  );
}

export default App;
