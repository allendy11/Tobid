import React from "react";
import logo from "../../../images/logo/logo_192b.png";
import "./css/TitleBlack.css";
const TitleBlack = () => {
  return (
    <div
      id="TitleBlack"
      onClick={() => {
        localStorage.clear();
        window.location.replace(`${process.env.REACT_APP_CLIENT_URL_LOCAL}`);
      }}
    >
      <img src={logo} alt="logo-footer" />
      <span>TOBID</span>
    </div>
  );
};

export default TitleBlack;
