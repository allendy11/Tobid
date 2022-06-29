import React from "react";
import "./LoginModal.css";
import { Link } from "react-router-dom";
import Oauth from "../Oauth/Oauth";
const LoginModal = () => {
  return (
    <div id="LoginModal">
      <div className="modal-container">
        <div className="modal-box">
          <div>
            <input type="email" placeholder="Email" />
          </div>
          <div>
            <input type="password" placeholder="Password" />
          </div>
          <div>err msg: something wrong</div>
          <div>Login</div>
          <div>
            <span>Don't have an account?</span>
            <Link to="/register">
              <span>Register</span>
            </Link>
          </div>
        </div>
        <div className="modal-box">
          <Oauth />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
