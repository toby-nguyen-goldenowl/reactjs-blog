import React, { Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "./configdb/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import RouteConfig, { Routes } from "./Routes";
import { authUser } from "./store/actions/index";
function App() {
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(authUser(user.uid));
      } else {
        dispatch(authUser(undefined));
      }
    });
  }, [userId]);
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
