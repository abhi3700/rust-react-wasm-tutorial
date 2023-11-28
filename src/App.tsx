import React, { useEffect, useState } from "react";
import init, { add } from "wasm-lib";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // inputs
  let x = 42,
    y = 51;

  const [ans, setAns] = useState(0);
  useEffect(() => {
    init().then(() => {
      setAns(add(x, y));
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          {x} + {y} = {ans}
        </p>
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
