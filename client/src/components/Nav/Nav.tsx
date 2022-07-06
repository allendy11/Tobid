import React, { useRef } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import Mymenu from "./Mymenu";
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
  const menuBoxRef = useRef<HTMLDivElement>(null);
  const mymenuRef = useRef<HTMLDivElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === "btn-logout") {
      localStorage.clear();
      window.location.replace(`${process.env.REACT_APP_CLIENT_URL_LOCAL}`);
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
          <div className="box isLogin" ref={menuBoxRef}>
            <div>
              <span>Welcome</span>
              <span
                onClick={() => {
                  menuBoxRef.current &&
                    menuBoxRef.current.classList.toggle("menuBtnOn");
                }}
                ref={mymenuRef}
              >
                {userInfo.username}
              </span>
            </div>
            <Mymenu menuBoxRef={menuBoxRef} handleClick={handleClick} />
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
