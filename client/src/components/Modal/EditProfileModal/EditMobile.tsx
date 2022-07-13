import React, { useState } from "react";
import IUser from "../../../Interface/IUser";
import "./EditProfileModal.css";
import axios from "axios";
const EditMobile = ({
  userInfo,
  setUserInfo,
  setEditMobile,
}: {
  userInfo: IUser["userInfo"];
  setUserInfo: IUser["setUserInfo"];
  setEditMobile: React.Dispatch<React.SetStateAction<boolean>>;
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
      e.target.id === "btn-cancel-editMobile"
    ) {
      setEditMobile(false);
    } else if (
      e.target instanceof HTMLDivElement &&
      e.target.id === "btn-done-editMobile"
    ) {
      editMobileFunc();
    }
  };
  const editMobileFunc = () => {
    const regExp = /^01([0|1|6|7|8|9]?)-([0-9]{3,4})-([0-9]{4})$/;
    if (!regExp.test(userInput)) {
      setErrorMessage({
        status: true,
        message: "잘못된 번호입니다.",
      });
      return;
    }
    const token_local = localStorage.getItem("token_local");
    if (token_local) {
      const _token_local = JSON.parse(token_local);
      axios({
        method: "PUT",
        url: `${process.env.REACT_APP_SERVER_URL_LOCAL}/user/${userInfo.id}/mobile`,
        data: { mobile: userInput },
        headers: {
          authorization: `Bearer ${_token_local}`,
        },
      }).then((res) => {
        localStorage.setItem(
          "userInfo_local",
          JSON.stringify({
            ...userInfo,
            mobile: userInput,
          })
        );
        setUserInfo({
          ...userInfo,
          mobile: userInput,
        });
        setEditMobile(false);
      });
    }
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      editMobileFunc();
    }
  };

  return (
    <div id="EditUserName" className="editProfileModal">
      <div className="editUserName-box, editProfileModal-box">
        <div>Change Mobile</div>
      </div>
      <div className="editUserName-box, editProfileModal-box">
        <div>MOBILE</div>
        <div>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) => handleKeyUp(e)}
            placeholder="010-1234-5678"
          />
        </div>
      </div>
      <div className="editMobile-box, editProfileModal-box">
        {errorMessage.status ? <span>{errorMessage.message}</span> : null}
      </div>
      <div className="editUserName-box, editProfileModal-box">
        <div id="btn-cancel-editMobile" onClick={(e) => handleClick(e)}>
          Cancel
        </div>
        <div id="btn-done-editMobile" onClick={(e) => handleClick(e)}>
          Done
        </div>
      </div>
    </div>
  );
};

export default EditMobile;
