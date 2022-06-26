import React from "react";
import "./css/Nav.css";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div className="nav-container">
      <Link to="/">
        <div className="nav-box nav-title">
          <img src={process.env.PUBLIC_URL + "logo_32.png"} alt="" />
          <span>Tobid</span>
        </div>
      </Link>
      <div className="nav-box nav-user">
        <Link to="/login">로그인</Link>
        <span className="bar"></span>
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default Nav;
