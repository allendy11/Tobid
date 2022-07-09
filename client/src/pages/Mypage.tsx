import React from "react";
import "./css/Mypage.css";
import Profile from "../components/Mypage/Profile";
const Mypage = () => {
  return (
    <div id="Mypage">
      <div className="container">
        <Profile />
      </div>
      <div className="container"></div>
    </div>
  );
};

export default Mypage;
