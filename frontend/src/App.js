import logo from './logo.svg';
import './App.css';
import Base from "./basecontroller/Base";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>Learning Full stack</h1>
        <Base tableId="5"></Base>
        <Base tableId="8"></Base>
        <Base tableId="9"></Base>
        <Base tableId="24"></Base>
        <Base tableId="36"></Base>
      </header>
    </div>
  );
}

export default App;
