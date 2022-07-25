import React, { useRef } from "react";
import IUser from "../../Interface/IUser";
import axios from "axios";
import dotenv from "dotenv";
import profileImage from "../../images/default/my_image.png";
dotenv.config();
const UserImage = ({
  userInfo,
  setUserInfo,
}: {
  userInfo: IUser["userInfo"];
  setUserInfo: IUser["setUserInfo"];
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setUserInfo({
          ...userInfo,
          image: String(reader.result),
        });
      }
    };
    if (e.target.files) {
      // 이미지 클릭후 변경없이 취소하는 경우
      if (e.target.files.length === 0) {
        return;
      }
      // 이지 클릭후 변경하는 경우
      reader.readAsDataURL(e.target.files[0]);
      const formData = new FormData();
      formData.append("img", e.target.files[0]);
      const token_local = localStorage.getItem("token_local");
      if (token_local) {
        const _token_local = JSON.parse(token_local);
        axios({
          method: "PUT",
          url: `${process.env.REACT_APP_SERVER_URL_LOCAL}/user/${userInfo.id}/image`,
          data: formData,
          headers: {
            authorization: `Bearer ${_token_local}`,
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }).then((res) => {
          localStorage.setItem(
            "userInfo_local",
            JSON.stringify({
              ...userInfo,
              image: res.data.url,
            })
          );
          setUserInfo({
            ...userInfo,
            image: res.data.url,
          });
        });
      }
    }
  };
  const imageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    inputRef.current && inputRef.current.click();
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const token_local = localStorage.getItem("token_local");
    if (token_local) {
      const _token_local = JSON.parse(token_local);
      axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_SERVER_URL_LOCAL}/user/${userInfo.id}/image`,
        headers: {
          authorization: `Bearer ${_token_local}`,
        },
        withCredentials: true,
      }).then((res) => {
        localStorage.setItem(
          "userInfo_local",
          JSON.stringify({
            ...userInfo,
            image: "",
          })
        );
        setUserInfo({
          ...userInfo,
          image: "",
        });
      });
    }
  };
  // console.log(userInfo);
  return (
    <div id="UserImage">
      <form method="put" encType="multipart/form-data">
        <input
          id="add-image"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={(e) => imageChange(e)}
        />
        <img
          id="profile-image"
          src={userInfo.image === "" ? profileImage : userInfo.image}
          alt="Profile Image"
          onClick={(e) => imageClick(e)}
        />
        <div className="delete-button">
          {userInfo.image === "" ? (
            ""
          ) : (
            <div onClick={(e) => handleClick(e)}>Delete</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserImage;