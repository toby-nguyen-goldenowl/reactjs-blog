import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "../../configdb/firebaseConfig";

function clickLogOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      const history = useHistory();
      history.push("/");
    });
}

export default function LogOut() {
  return (
    <>
      <h2 className="text">Are you sure you want to sign out? </h2>
      <button type="button" onClick={clickLogOut}>
        Log out
      </button>
    </>
  );
}
