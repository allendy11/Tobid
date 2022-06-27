import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div id="Nav">
      <div className="container">
        <div className="box">
          <img src={process.env.PUBLIC_URL + "logo_32.png"} alt="" />
          <span>TOBID</span>
        </div>
        <div className="box">
          <Link to="/login">
            <div>로그인</div>
          </Link>
          <span className="bar"></span>
          <Link to="/register">
            <div>회원가입</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
