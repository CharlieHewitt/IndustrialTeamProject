import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <div className="navbar">
      <p>Navigation for testing</p>
      <ul>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/host-settings">HOST SETTINGS</Link>
        </li>
        <li>
          <Link to="/something">Non-existing page</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
