import React from "react";

interface INav {
  innerWidth: number;
  userInfo: {
    username: string;
    email: string;
    token: string;
  };
  setUserInfo: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email: string;
      token: string;
    }>
  >;
  loginStatus: boolean;
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
}
export default INav;
