import logo from './logo.svg';
import './App.css';
import Base from "./basecontroller/Base";
import BlobUploader from "./blob-handler/BlobUploader";
import BlobList from "./blob-handler/BlobList";
import Skeleton from "./layout/Skeleton";

function App() {
  return (
    <div className="App">
        <Skeleton></Skeleton>
    </div>
  );
}

export default App;
