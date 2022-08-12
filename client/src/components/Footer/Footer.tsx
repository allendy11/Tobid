import React from "react";
import "./Footer.css";
import TitleBlack from "../ETC/Title/TitleBlack";
const Footer = () => {
  return (
    <div id="Footer">
      <div className="container">
        <div className="box">
          <TitleBlack />
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
