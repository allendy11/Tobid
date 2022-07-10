import React from "react";
import "./css/Mypage.css";
import Profile from "../components/Mypage/Profile";
import IUser from "../Interface/IUser";
const Mypage = ({ userInfo, setUserInfo }: IUser) => {
  return (
    <div id="Mypage">
      <div className="container">
        <Profile userInfo={userInfo} setUserInfo={setUserInfo} />
      </div>
      <div className="container"></div>
    </div>
  );
};

export default Mypage;
