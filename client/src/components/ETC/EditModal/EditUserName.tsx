import React from "react";
import "./EditModal.css";
const EditUserName = () => {
  return (
    <div id="EditUserName">
      <div className="editUserName-box">
        <div>Change Username</div>
      </div>
      <div className="editUserName-box">
        <div>USERNAME</div>
        <div>
          <input type="text" />
        </div>
      </div>
      <div className="editUserName-box">
        <div>Cancel</div>
        <div>Done</div>
      </div>
    </div>
  );
};

export default EditUserName;
