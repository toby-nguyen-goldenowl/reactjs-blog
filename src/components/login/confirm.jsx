import React from "react";
import { Link } from "react-router-dom";

const ConFirmLogout = () => (
  <div>
    <h2 className="text">Are you sure you want to sign out? </h2>
    <div>
      <Link to="/" className="MyLink">
        Back SignIn
      </Link>
    </div>
  </div>
);

export default ConFirmLogout;
