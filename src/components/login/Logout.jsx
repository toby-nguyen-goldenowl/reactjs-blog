import React from "react";
import { Link } from "react-router-dom";

const LogOut = () => (
  <>
    <button type="button">
      <Link to="/logout">Log out</Link>
    </button>
  </>
);
export default LogOut;
