import React, { useState } from "react";
import "./LoginModal.css";
import { Link } from "react-router-dom";
import Oauth from "../Oauth/Oauth";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const LoginModal = ({
  userInfo,
  setUserInfo,
}: {
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
}) => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
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
    console.log(userInput);
    if (e.target instanceof HTMLDivElement && e.target.id === "btn-login") {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL_LOCAL}/user/login`,
        data: { email: userInput.email, password: userInput.password },
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          setUserInfo({
            ...userInfo,
            email: res.data.user.email,
            username: res.data.user.username,
            token: res.data.token,
          });
          window.location.assign(`${process.env.REACT_APP_CLIENT_URL_LOCAL}`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <div id="LoginModal">
      <div className="modal-container">
        <div className="modal-box">
          <div>
            <input
              id="input-email"
              type="email"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <input
              id="input-password"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>err msg: something wrong</div>
          <div id="btn-login" onClick={(e) => handleClick(e)}>
            Login
          </div>
          <div>
            <span>Don't have an account?</span>
            <Link to="/register">
              <span>Register</span>
            </Link>
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
