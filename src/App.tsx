import { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import config from "./config";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React + TypeScript!</p>
        <p>
          <button type="button" onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
        </p>
        <code>{JSON.stringify(config, null, 2)}</code>
      </header>
    </div>
  );
}

export default App;
