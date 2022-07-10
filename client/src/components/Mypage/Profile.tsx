import React, { useState, useRef } from "react";
import "./Profile.css";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import dotenv from "dotenv";
import IUser from "../../Interface/IUser";
import EditUserName from "../../components/ETC/EditModal/EditUserName";
dotenv.config();
const Profile = ({
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
  const profile = {
    username: userInfo.username,
    email: userInfo.email,
    mobile: userInfo.mobile,
  };
  const profileImage = userInfo.image;
  return (
    <div id="Profile">
      <div className="profile-container">
        <span>Profile</span>
      </div>
      <div className="profile-container">
        <UserImage profileImage={profileImage} />
        <UserInfo profile={profile} setErrorModal={setErrorModal} />
      </div>
      <EditUserName />
    </div>
  );
};

export default Profile;
