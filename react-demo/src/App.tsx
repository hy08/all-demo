import React, { useId, useSyncExternalStore } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const id = useId();
  const id1 = useId();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{id}</p>
        <p>{id1}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
