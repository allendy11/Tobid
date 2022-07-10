import React from "react";

const UserInfo = ({
  profile,
}: {
  profile: { username: string; email: string; mobile: string };
}) => {
  return (
    <div id="UserInfo">
      <div className="infoBox">
        <span>Email</span>
        <div>
          <span>{profile.email}</span>
          <div className="edit-button">Edit</div>
        </div>
      </div>
      <div className="infoBox">
        <span>Username</span>
        <div>
          <span>{profile.username}</span>
          <div className="edit-button">Edit</div>
        </div>
      </div>
      <div className="infoBox">
        <span>Mobile</span>
        <div>
          <span>{profile.mobile}</span>
          <div className="edit-button">Edit</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
