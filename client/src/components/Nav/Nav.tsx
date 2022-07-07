import React, { useRef } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import UserMenuModal from "./UserMenuModal";
import MenuIcon from "../ETC/MenuIcon/MenuIcon";
import INav from "../../Interface/INav";
const Nav = ({
  innerWidth,
  userInfo,
  setUserInfo,
  loginStatus,
  setLoginStatus,
}: INav) => {
  const menuBoxRef = useRef<HTMLDivElement>(null);
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
          <div className="box" ref={menuBoxRef}>
            <div
              className="menuIcon-box"
              onClick={() => {
                menuBoxRef.current &&
                  menuBoxRef.current.classList.toggle("menuBtnOn");
              }}
            >
              <MenuIcon />
            </div>
            <div>
              <UserMenuModal
                loginStatus={loginStatus}
                handleClick={handleClick}
                menuBoxRef={menuBoxRef}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
