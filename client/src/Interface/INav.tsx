import { ExecFileSyncOptionsWithBufferEncoding } from "child_process";
import React from "react";
import IUser from "./IUser";
interface INav {
  innerWidth: number;
  userInfo: IUser["userInfo"];
  setUserInfo: IUser["setUserInfo"];
  loginStatus: boolean;
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
}
export default INav;
