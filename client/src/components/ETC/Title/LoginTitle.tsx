import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo/logo_32.png";
const LoginTitle = () => {
  return (
    <header id="LoginTitle">
      <Link to="/">
        <div>
          <img src={logo} alt="logo-nav" />
          <span>TOBID</span>
        </div>
      </Link>
    </header>
  );
};

export default LoginTitle;
