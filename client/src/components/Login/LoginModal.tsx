import React, { useState } from "react";
import "./LoginModal.css";
import { Link } from "react-router-dom";
import Oauth from "../Oauth/Oauth";
import axios from "axios";
import dotenv from "dotenv";
import { stringify } from "querystring";
import IUser from "../../Interface/IUser";
dotenv.config();
const LoginModal = ({
  userInfo,
  setUserInfo,
}: {
  userInfo: IUser["userInfo"];
  setUserInfo: IUser["setUserInfo"];
}) => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState({
    status: false,
    message: "test",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "input-email") {
      setUserInput({
        ...userInput,
        email: e.target.value,
      });
    } else if (e.target.id === "input-password") {
      setUserInput({
        ...userInput,
        password: e.target.value,
      });
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === "btn-login") {
      loginFunc();
    }
  };
  const loginFunc = () => {
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const regSpace = /\s/g;
    if (
      !regEmail.test(userInput.email) ||
      userInput.password === "" ||
      regSpace.test(userInput.password)
    ) {
      setErrMessage({
        status: true,
        message: "Incorrect username or password",
      });
      setUserInput({
        email: "",
        password: "",
      });
    } else {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL_LOCAL}/user/login`,
        data: { email: userInput.email, password: userInput.password },
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          localStorage.setItem("loginStatus_local", JSON.stringify(true));
          localStorage.setItem("token_local", JSON.stringify(res.data.token));
          localStorage.setItem(
            "userInfo_local",
            JSON.stringify({
              id: res.data.user.id,
              username: res.data.user.username,
              email: res.data.user.email,
              mobile: res.data.user.mobile,
              image: res.data.user.image === null ? "" : res.data.user.image,
              admin: res.data.user.admin,
            })
          );
          window.location.replace(`${process.env.REACT_APP_CLIENT_URL_LOCAL}`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      loginFunc();
    }
  };
  return (
    <div id="LoginModal">
      <div className="modal-container">
        <div className="modal-box">
          <div className="login-userInput">
            <div>
              <input
                id="input-email"
                type="email"
                placeholder="Email"
                value={userInput.email}
                onChange={(e) => handleChange(e)}
                onKeyPress={(e) => handleKeyUp(e)}
              />
            </div>
            <div>
              <input
                id="input-password"
                type="password"
                placeholder="Password"
                value={userInput.password}
                onChange={(e) => handleChange(e)}
                onKeyPress={(e) => handleKeyUp(e)}
              />
            </div>
          </div>
          <div className="error-message">
            {errMessage.status ? <div>{errMessage.message}</div> : <div></div>}
          </div>
          <div className="login-button">
            <div id="btn-login" onClick={(e) => handleClick(e)}>
              Log in
            </div>
            <div className="go-register">
              <span>Don't have an account?</span>
              <Link to="/register">
                <span>Register</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="modal-box">
          <Oauth />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
