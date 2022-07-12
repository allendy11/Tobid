import React, { useState, useRef } from "react";
import "./Profile.css";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import dotenv from "dotenv";
import IUser from "../../Interface/IUser";
import EditUserName from "../../components/Modal/EditProfileModal/EditUserName";
import EditMobile from "../Modal/EditProfileModal/EditMobile";
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
  const [editUserName, setEditUserName] = useState(false);
  const [editMobile, setEditMobile] = useState(false);
  const profile = {
    username: userInfo.username,
    email: userInfo.email,
    mobile: userInfo.mobile,
  };
  const profileImage = userInfo.image;
  console.log(profileImage);
  return (
    <div id="Profile">
      <div className="profile-container">
        <span>Profile</span>
      </div>
      <div className="profile-container">
        <UserImage profileImage={profileImage} />
        <UserInfo
          profile={profile}
          setErrorModal={setErrorModal}
          setEditUserName={setEditUserName}
          setEditMobile={setEditMobile}
        />
      </div>
      {editUserName ? (
        <div className="editProfileModal-background">
          <div className="editProfileModal-background-a">
            <EditUserName
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setEditUserName={setEditUserName}
            />
          </div>
        </div>
      ) : null}

      {editMobile ? (
        <div className="editProfileModal-background">
          <div className="editProfileModal-background-a">
            <EditMobile
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setEditMobile={setEditMobile}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
