import { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import config from "./config";
import { Button } from "antd";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello React + Ant Design + TypeScript!</p>
        <div>
          <Button type="primary" onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </Button>
        </div>
        <code>{JSON.stringify(config, null, 2)}</code>
      </header>
    </div>
  );
}

export default App;
