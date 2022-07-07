import React from "react";
import { Link } from "react-router-dom";
import IUserMenu from "../../Interface/IUserMenu";

const UserMenu = ({ loginStatus, handleClick, menuBoxRef }: IUserMenu) => {
  return (
    <div id="UserMenu">
      {loginStatus ? (
        <div className="usermenu-box">
          <div>
            <Link to="/mypage">Mypage</Link>
          </div>
          <span className="bar"></span>
          <div id="btn-logout" onClick={(e) => handleClick(e)}>
            Logout
          </div>
        </div>
      ) : (
        <div className="usermenu-box">
          <Link to="/login">
            <div
              onClick={() => {
                menuBoxRef &&
                  menuBoxRef.current &&
                  menuBoxRef.current.classList.remove("menuBtnOn");
              }}
            >
              Login
            </div>
          </Link>
          <span className="bar"></span>
          <Link to="/register">
            <div
              onClick={() => {
                menuBoxRef &&
                  menuBoxRef.current &&
                  menuBoxRef.current.classList.remove("menuBtnOn");
              }}
            >
              Register
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
