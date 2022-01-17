import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
function ComA() {
  const [time, setTime] = useState(0);
  setInterval(() => {
    setTime(new Date());
  }, 1000);
  return <div>compontent A :{time.toString()}</div>;
}
function App() {
  const vdom = (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
      <ComA name="coma" />
    </div>
  );
  console.log(vdom);
  return vdom;
}

export default App;
