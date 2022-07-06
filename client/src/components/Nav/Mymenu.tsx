import React from "react";
import { Link } from "react-router-dom";
interface IMymenu {
  menuBoxRef: React.RefObject<HTMLDivElement>;
  handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const Mymenu = ({ menuBoxRef, handleClick }: IMymenu) => {
  return (
    <div id="myMenu">
      <div
        id="btn-mypage"
        onClick={() => {
          menuBoxRef.current &&
            menuBoxRef.current.classList.toggle("menuBtnOn");
        }}
      >
        <Link to="/mypage">Mypage</Link>
      </div>
      <div id="btn-logout" onClick={(e) => handleClick(e)}>
        Logout
      </div>
    </div>
  );
};

export default Mymenu;
