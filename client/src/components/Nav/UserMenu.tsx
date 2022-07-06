import React from "react";
import { Link } from "react-router-dom";
interface IUserMenu {
  loginStatus: boolean;
  handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const UserMenu = ({ loginStatus, handleClick }: IUserMenu) => {
  return (
    <div id="UserMenu">
      {loginStatus ? (
        <div className="box">
          <div>
            <Link to="/mypage">Mypage</Link>
          </div>
          <span className="bar"></span>
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
  );
};

export default UserMenu;
