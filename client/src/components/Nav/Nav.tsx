import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
const Nav = ({
  userInfo,
  setUserInfo,
  loginStatus,
  setLoginStatus,
}: {
  userInfo: {
    username: string;
    email: string;
    token: string;
  };
  setUserInfo: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email: string;
      token: string;
    }>
  >;
  loginStatus: boolean;
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === "btn-logout") {
      localStorage.clear();
      window.location.assign(`${process.env.REACT_APP_CLIENT_URL_LOCAL}`);
    }
  };
  return (
    <div id="Nav">
      <div className="container">
        <Link to="/">
          <div className="box">
            <img
              src={process.env.PUBLIC_URL + "images/logo/logo_32.png"}
              alt="logo-nav"
            />
            <span>TOBID</span>
          </div>
        </Link>
        {loginStatus ? (
          <div className="box isLogin">
            <div>Welcome {userInfo.username}</div>
            <div id="btn-logout" onClick={(e) => handleClick(e)}>
              Logout
            </div>
          </div>
        ) : (
          <div className="box">
            <Link to="/login">
              <div>Login</div>
            </Link>
            <span className="bar"></span>
            <Link to="/register">
              <div>Register</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
