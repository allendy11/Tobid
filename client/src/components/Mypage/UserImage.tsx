import React, { useRef } from "react";
import IUser from "../../Interface/IUser";
const UserImage = ({ profileImage }: { profileImage: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const imageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    // if (image.default) {
    //   inputRef.current && inputRef.current.click();
    // }
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // setUserImage({
    //   default: true,
    //   url: `${process.env.PUBLIC_URL}/images/default/my_image.png`,
    // });
  };
  return (
    <div id="UserImage">
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
          id="profile-image"
          src={
            profileImage === ""
              ? `${process.env.PUBLIC_URL}/images/default/my_image.png`
              : profileImage
          }
          alt="Profile Image"
          onClick={(e) => imageClick(e)}
        />
        <div className="delete-button">
          {profileImage === "" ? (
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
