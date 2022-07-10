import React from "react";
import "./css/Mypage.css";
import Profile from "../components/Mypage/Profile";
import IUser from "../Interface/IUser";
const Mypage = ({
  userInfo,
  setUserInfo,
  setErrorModal,
}: {
  userInfo: IUser["userInfo"];
  setUserInfo: IUser["setUserInfo"];
  setErrorModal: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      message: string;
    }>
  >;
}) => {
  return (
    <div id="Mypage">
      <div className="container">
        <Profile
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setErrorModal={setErrorModal}
        />
      </div>
      <div className="container"></div>
    </div>
  );
};

export default Mypage;
