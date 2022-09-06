import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";

import { useEagerConnect } from "./hooks/useEagerConnect";
import { Home } from "./pages";

function App() {
  useEagerConnect();

  return (
    <div className="App">
      <div className="App_wrapper">
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
