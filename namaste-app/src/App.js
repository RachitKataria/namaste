import React from "react";
import HomePage from "./HomePage";
import { Provider } from "mobx-react";
import KeywordStore from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={KeywordStore}>
        <HomePage />
      </Provider>
    </div>
  );
}
export default App;
