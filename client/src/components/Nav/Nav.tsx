import React, { useRef } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import UserMenuModal from "./UserMenuModal";
import MenuIcon from "../ETC/MenuIcon/MenuIcon";
import INav from "../../Interface/INav";
import logo from "../../images/logo/logo_32.png";
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
      <div className="nav-container">
        <div className="nav-box">
          <Link to="/">
            <div>
              <img src={logo} alt="logo-nav" />
              <span>TOBID</span>
            </div>
          </Link>
        </div>
        <div className="nav-box">
          <div>
            <Link to="/bid">
              <div>Bid</div>
            </Link>
          </div>
          <div></div>
        </div>
        {innerWidth > 980 ? (
          <div className="nav-box">
            <UserMenu loginStatus={loginStatus} handleClick={handleClick} />
          </div>
        ) : (
          <div className="nav-box" ref={menuBoxRef}>
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
