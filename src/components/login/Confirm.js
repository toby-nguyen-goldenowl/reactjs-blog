import React from "react";
import { useHistory } from "react-router-dom";
import { logOut } from "../../services/firebaseService";
import "./style.css";

export default function ConFirmLogout() {
  const history = useHistory();
  function clickLogOut() {
    logOut().then(() => history.push("/"));
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
