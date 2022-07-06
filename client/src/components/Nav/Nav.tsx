import React, { useRef } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import MenuIcon from "../ETC/MenuIcon/MenuIcon";
import UserMenu from "./UserMenu";
const Nav = ({
  innerWidth,
  userInfo,
  setUserInfo,
  loginStatus,
  setLoginStatus,
}: {
  innerWidth: number;
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
        {innerWidth > 980 ? (
          <div className="box">
            <UserMenu loginStatus={loginStatus} handleClick={handleClick} />
          </div>
        ) : (
          <div className="box">
            <MenuIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
