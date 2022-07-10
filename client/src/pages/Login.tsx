import React from "react";
import "./css/Login.css";
import LoginModal from "../components/Login/LoginModal";
import IUser from "../Interface/IUser";

const Login = ({
  userInfo,
  setUserInfo,
}: {
  userInfo: IUser["userInfo"];
  setUserInfo: IUser["setUserInfo"];
}) => {
  return (
    <div id="Login">
      <div className="container">
        <div className="box">
          <div className="content1">Login</div>
          <div className="content2">Welcome to TOBID.</div>
        </div>
        <div className="box">
          <LoginModal userInfo={userInfo} setUserInfo={setUserInfo} />
        </div>
      </div>
    </div>
  );
};

export default Login;
