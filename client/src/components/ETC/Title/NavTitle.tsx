import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo/logo_32.png";
import "./css/NavTitle.css";
const NavTitle = () => {
  return (
    <header id="NavTitle">
      <Link to="/">
        <div>
          <img src={logo} alt="logo-title" id="title-logo" />
          <span id="title-text">TOBID</span>
        </div>
      </Link>
    </header>
  );
};

export default NavTitle;
