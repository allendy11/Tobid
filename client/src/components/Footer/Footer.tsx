import React from "react";
import "./Footer.css";
import logo from "../../images/logo/logo_192b.png";
const Footer = () => {
  return (
    <div id="Footer">
      <div className="container">
        <div
          className="box"
          onClick={() => {
            localStorage.clear();
            window.location.replace(
              `${process.env.REACT_APP_CLIENT_URL_LOCAL}`
            );
          }}
        >
          <img src={logo} alt="logo-footer" />
          <span>TOBID</span>
        </div>
        <div className="box">
          <div className="contents">
            <div>
              <span>Developer</span>
              <span>윤대희</span>
            </div>
            <span className="bar"></span>
            <div>
              <span>Email</span>
              <span>allendy11@gmail.com</span>
            </div>
            <span className="bar"></span>

            <div>
              <span>Github</span>
              <a href="https://github.com/allendy11">
                https://github.com/allendy11
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
