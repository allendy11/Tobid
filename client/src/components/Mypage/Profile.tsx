import React, { useState } from "react";
import "./Profile.css";
import dotenv from "dotenv";
dotenv.config();
const Profile = () => {
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {};

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
              onChange={(e) => imageHandler(e)}
            />
            <label htmlFor="add-image">
              <img
                id="my-image"
                src={`${process.env.PUBLIC_URL}/images/default/my_image.png`}
                alt="My Image"
              />
            </label>
          </form>
        </div>
        <div className="userInfo-box"></div>
      </div>
    </div>
  );
};

export default Profile;
