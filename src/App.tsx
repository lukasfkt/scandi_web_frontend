import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import "./global.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
