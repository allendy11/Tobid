import React from "react";
import "./RegisterModal.css";
import { Link } from "react-router-dom";
const RegisterModal = () => {
  return (
    <div id="RegisterModal">
      <div className="modal-container">
        <div className="modal-box">
          <div>
            <input type="text" placeholder="Username" />
          </div>
          <div>
            <input type="text" placeholder="Email" />
          </div>
          <div>
            <input type="password" placeholder="Password" />
          </div>
          <div>
            <input type="password" placeholder="Re-type Password" />
          </div>
          <div>error msg : something wrong</div>
        </div>
        <div className="modal-box">
          <div>Complete</div>
          <div>
            <span>Already have an account?</span>
            <Link to="/login">
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
