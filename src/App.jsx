import React, { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "./configdb/firebaseConfig";
import RouteConfig, { Routes } from "./routes";
import authUser from "./store/actions/index";

function App(props) {
  let { userId } = props;
  const { authUserId } = props;
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(userId);
      if (user) {
        userId = user.uid;
        authUserId(userId);
      } else {
        userId = undefined;
        authUserId(userId);
      }
    });
  }, [authUserId]);
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

const mapStateToProps = (state) => ({
  userId: state.user.userId,
  loading: state.user.loading,
});

const mapDispatchToProps = {
  authUserId: authUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
