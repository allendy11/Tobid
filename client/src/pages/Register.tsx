import React from "react";
import "./css/Register.css";
import RegisterModal from "../components/Register/RegisterModal";
const Register = () => {
  return (
    <div id="Register">
      <div className="container">
        <div className="box">
          <div className="content1">Register</div>
          <div></div>
        </div>
        <div className="box">
          <RegisterModal />
        </div>
      </div>
    </div>
  );
};

export default Register;
