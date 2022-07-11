import React, { useState } from "react";
import "./EditModal.css";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const EditUserName = ({
  setEditUserName,
}: {
  setEditUserName: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [editNameInput, setEditNameInput] = useState("");
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
      const token_local = localStorage.getItem("token_local");
      if (token_local) {
        const _token_local = JSON.parse(token_local);
        axios({
          method: "PUT",
          url: `${process.env.REACT_APP_SERVER_URL_LOCAL}/user/update`,
          data: { username: editNameInput },
          headers: {
            authorization: `Bearer ${_token_local}`,
          },
        }).then((res) => console.log(res.data));
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNameInput(e.target.value);
  };

  return (
    <div id="EditUserName">
      <div className="editUserName-box">
        <div>Change Username</div>
      </div>
      <div className="editUserName-box">
        <div>USERNAME</div>
        <div>
          <input type="text" onChange={(e) => handleChange(e)} />
        </div>
      </div>
      <div className="editUserName-box">
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
