import React, { useState, useRef } from "react";
import "./Profile.css";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import dotenv from "dotenv";
import IUser from "../../Interface/IUser";
dotenv.config();
const Profile = ({ userInfo, setUserInfo }: IUser) => {
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
        <UserInfo profile={profile} />
      </div>
    </div>
  );
};

export default Profile;
