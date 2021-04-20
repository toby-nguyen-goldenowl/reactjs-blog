import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "./style.css";
import "firebase/database";
import "firebase/auth";
import "../../configdb/firebaseConfig";

export default function ConFirmLogout() {
  const history = useHistory();
  function clickLogOut() {
    firebase
      .auth()
      .signOut()
      .then(() => history.push("/"));
  }
  return (
    <div className="confirmLogout">
      <h2 className="text">Are you sure you want to sign out? </h2>
      <button type="button" onClick={clickLogOut}>
        yes
      </button>
    </div>
  );
}
