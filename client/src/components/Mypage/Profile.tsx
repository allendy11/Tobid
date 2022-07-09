import React, { useState, useRef } from "react";
import "./Profile.css";
import dotenv from "dotenv";
dotenv.config();
const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });
  const [userImage, setUserImage] = useState({
    default: false,
    url: `${process.env.PUBLIC_URL}/images/default/my_image.png`,
  });
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const imageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (userImage.default) {
      inputRef.current && inputRef.current.click();
    } else {
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setUserImage({
      default: true,
      url: `${process.env.PUBLIC_URL}/images/default/my_image.png`,
    });
  };
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div id="Profile">
      <div className="profile-container">
        <span>Profile</span>
      </div>
      <div className="profile-container">
        <div className="image-box">
          <form method="post" encType="multipart/form-data">
            <input
              id="add-image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={(e) => imageChange(e)}
            />
            <img
              id="my-image"
              src={userImage.url}
              alt="My Image"
              onClick={(e) => imageClick(e)}
            />
            <div className="delete-button">
              {userImage.default ? (
                ""
              ) : (
                <div onClick={(e) => handleClick(e)}>Delete</div>
              )}
            </div>
          </form>
        </div>
        <div className="userInfo-box"></div>
      </div>
    </div>
  );
};

export default Profile;
