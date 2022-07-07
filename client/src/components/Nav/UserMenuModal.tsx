import React, { useRef } from "react";
import MenuIcon from "../ETC/MenuIcon/MenuIcon";
import UserMenu from "./UserMenu";
import IUserMenu from "../../Interface/IUserMenu";
const UserMenuModal = ({ loginStatus, handleClick, menuBoxRef }: IUserMenu) => {
  return (
    <div
      id="UserMenuModal"
      onMouseLeave={() => {
        menuBoxRef &&
          menuBoxRef.current &&
          menuBoxRef.current.classList.remove("menuBtnOn");
      }}
    >
      <UserMenu
        loginStatus={loginStatus}
        handleClick={handleClick}
        menuBoxRef={menuBoxRef}
      />
    </div>
  );
};

export default UserMenuModal;
