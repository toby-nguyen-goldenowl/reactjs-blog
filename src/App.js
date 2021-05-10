import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "firebase/auth";
import "./config/firebase";
import RouteConfig, { Routes } from "./Routes";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          <div>
            <div>{RouteConfig({ routes: Routes })}</div>
          </div>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
