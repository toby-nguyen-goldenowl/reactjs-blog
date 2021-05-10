import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { handleLogOut } from "../../store/reducers/userReducer";

import "./style.css";

export default function ConFirmLogout() {
  const history = useHistory();
  const dispatch = useDispatch();
  const clickLogOut = async () => {
    try {
      await dispatch(handleLogOut());
      history.push("/home");
    } catch (error) {
      alert(error.message);
    }
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
