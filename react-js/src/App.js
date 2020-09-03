import React from "react";
import Keyboard from "./components/Keyboard";
import { Display } from "./components/Display";
import { GlobalProvider } from "./context/GlobalState";
import "./app.css";
import "./grid.css";

function App() {
  return (
    <GlobalProvider>
      <div className="wrapper" id="wrapper">
        <Display />
        <Keyboard />
      </div>
    </GlobalProvider>
  );
}

export default App;
