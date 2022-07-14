import React, { useState } from "react";
import IUser from "../../Interface/IUser";
const UserInfo = ({
  userInfo,
  setErrorModal,
  setEditUserName,
  setEditMobile,
}: {
  userInfo: IUser["userInfo"];
  setErrorModal: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      message: string;
    }>
  >;
  setEditUserName: React.Dispatch<React.SetStateAction<boolean>>;
  setEditMobile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === "edit-email") {
      setErrorModal({
        status: true,
        message: "현재 이메일 변경은 불가합니다.",
      });
    } else if (
      e.target instanceof HTMLDivElement &&
      e.target.id === "edit-username"
    ) {
      setEditUserName(true);
    } else if (
      e.target instanceof HTMLDivElement &&
      e.target.id === "edit-mobile"
    ) {
      setEditMobile(true);
    }
  };
  return (
    <div id="UserInfo">
      <div className="infoBox">
        <span>Email</span>
        <div>
          <span>{userInfo.email}</span>
          <div
            id="edit-email"
            className="edit-button"
            onClick={(e) => handleClick(e)}
          >
            Edit
          </div>
        </div>
      </div>
      <div className="infoBox">
        <span>Username</span>
        <div>
          <span>{userInfo.username}</span>
          <div
            id="edit-username"
            className="edit-button"
            onClick={(e) => handleClick(e)}
          >
            Edit
          </div>
        </div>
      </div>
      <div className="infoBox">
        <span>Mobile</span>
        <div>
          <span>{userInfo.mobile}</span>
          <div
            id="edit-mobile"
            className="edit-button"
            onClick={(e) => handleClick(e)}
          >
            Edit
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
