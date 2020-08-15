import React from "react";
import HomePage from "./HomePage";
import { KeywordStore } from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const keywordStore = new KeywordStore();
function App() {
  return (
    <div className="App">
      <HomePage keywordStore={keywordStore} />
    </div>
  );
}
export default App;
