import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div id="Footer">
      <div className="container">
        <div className="box">
          <img src={process.env.PUBLIC_URL + "logo_192.png"} alt="" />
          <span>TOBID</span>
        </div>
        <div className="box">
          <div className="contents">
            <div>제작자 : 윤대희</div>
            <div>E-MAIL : allendy11@gmail.com</div>
            <div>
              GITHUB :
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
