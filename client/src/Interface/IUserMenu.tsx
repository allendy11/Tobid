import React from "react";
interface IUserMenu {
  loginStatus: boolean;
  handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  menuBoxRef?: React.RefObject<HTMLDivElement>;
}
export default IUserMenu;
