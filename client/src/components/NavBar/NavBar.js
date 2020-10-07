import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/Test">Test</Link>
        </li>
        <li>
          <Link to="/something">Non-existing page</Link>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default NavBar;
