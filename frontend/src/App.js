import logo from './logo.svg';
import './App.css';
import Base from "./basecontroller/Base";
import BlobUploader from "./blob-handler/BlobUploader";
import BlobList from "./blob-handler/BlobList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BlobUploader></BlobUploader>
        <BlobList></BlobList>
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
