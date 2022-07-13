import React, { useState } from "react";
import "./EditProfileModal.css";
import axios from "axios";
import dotenv from "dotenv";
import IUser from "../../../Interface/IUser";
dotenv.config();
const EditUserName = ({
  userInfo,
  setUserInfo,
  setEditUserName,
}: {
  userInfo: IUser["userInfo"];
  setUserInfo: IUser["setUserInfo"];
  setEditUserName: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [userInput, setUserInput] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (
      e.target instanceof HTMLDivElement &&
      e.target.id === "btn-cancel-editUserName"
    ) {
      setEditUserName(false);
    } else if (
      e.target instanceof HTMLDivElement &&
      e.target.id === "btn-done-editUserName"
    ) {
      editUserNameFunc();
    }
  };
  const editUserNameFunc = () => {
    const token_local = localStorage.getItem("token_local");
    if (token_local) {
      const _token_local = JSON.parse(token_local);
      axios({
        method: "PUT",
        url: `${process.env.REACT_APP_SERVER_URL_LOCAL}/user/${userInfo.id}/username`,
        data: { username: userInput },
        headers: {
          authorization: `Bearer ${_token_local}`,
        },
      }).then((res) => {
        localStorage.setItem(
          "userInfo_local",
          JSON.stringify({
            ...userInfo,
            username: userInput,
          })
        );
        setUserInfo({
          ...userInfo,
          username: userInput,
        });
        setEditUserName(false);
      });
    }
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      editUserNameFunc();
    }
  };
  return (
    <div id="EditUserName" className="editProfileModal">
      <div className="editUserName-box, editProfileModal-box">
        <div>Change Username</div>
      </div>
      <div className="editUserName-box, editProfileModal-box">
        <div>USERNAME</div>
        <div>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) => handleKeyUp(e)}
            placeholder={userInfo.username}
          />
        </div>
      </div>
      <div className="editUserName-box, editProfileModal-box">
        {errorMessage.status ? <span>{errorMessage.message}</span> : null}
      </div>
      <div className="editUserName-box, editProfileModal-box">
        <div id="btn-cancel-editUserName" onClick={(e) => handleClick(e)}>
          Cancel
        </div>
        <div id="btn-done-editUserName" onClick={(e) => handleClick(e)}>
          Done
        </div>
      </div>
    </div>
  );
};

export default EditUserName;
