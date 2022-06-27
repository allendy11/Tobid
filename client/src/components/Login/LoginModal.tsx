import React from "react";
import "./LoginModal.css";
const LoginModal = () => {
  return (
    <div id="LoginModal">
      <div className="container">
        <div className="box">
          <div>
            <input type="email" placeholder="Email" />
          </div>
          <div>
            <input type="password" placeholder="Password" />
          </div>
          <div>
            <input type="checkbox" />
            <span>Remember Email</span>
          </div>
          <div>Login</div>
          <div>
            <span>Singup</span>
            <span className="bar">|</span>
            <span>Find Email</span>
            <span className="bar">|</span>

            <span>Find Password</span>
          </div>
        </div>
        <div className="box"></div>
      </div>
    </div>
  );
};

export default LoginModal;
