import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div id="Nav">
      <div className="container">
        <Link to="/">
          <div className="box">
            <img src={process.env.PUBLIC_URL + "logo_32.png"} alt="" />
            <span>TOBID</span>
          </div>
        </Link>
        <div className="box">
          <Link to="/login">
            <div>Login</div>
          </Link>
          <span className="bar"></span>
          <Link to="/register">
            <div>Register</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
