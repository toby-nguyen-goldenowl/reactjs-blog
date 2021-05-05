import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authUser, logOut } from "../../store/actions/index";
import "./style.css";

export default function ConFirmLogout() {
  const history = useHistory();
  const dispatch = useDispatch();
  const clickLogOut = () => {
    logOut().then(() => {
      dispatch(authUser(undefined));
      history.push("/home");
    });
  };
  return (
    <div className="confirmLogout">
      <h2 className="text">Are you sure you want to sign out? </h2>
      <button type="button" onClick={clickLogOut}>
        yes
      </button>
    </div>
  );
}
