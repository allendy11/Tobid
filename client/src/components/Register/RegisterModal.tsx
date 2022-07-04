import React, { useState } from "react";
import "./RegisterModal.css";
import { Link } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import dotenv from "dotenv";
dotenv.config();
const RegisterModal = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errMessage, setErrMessage] = useState({
    status: false,
    message: "test",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.id === "register-username") {
      setUserInput({
        ...userInput,
        username: e.target.value,
      });
    } else if (e.target && e.target.id === "register-email") {
      setUserInput({
        ...userInput,
        email: e.target.value,
      });
    } else if (e.target && e.target.id === "register-password") {
      setUserInput({
        ...userInput,
        password: e.target.value,
      });
    } else if (e.target && e.target.id === "register-password2") {
      setUserInput({
        ...userInput,
        password2: e.target.value,
      });
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    requestRegister();
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      requestRegister();
    }
  };

  const requestRegister = async () => {
    try {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL_LOCAL}/user/register`,
        data: {
          username: userInput.username,
          email: userInput.email,
          password: userInput.password,
        },
      }).then((res) => {
        console.log("work");
        setErrMessage({
          status: false,
          message: "",
        });
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          if (err.response.status === 409) {
            setErrMessage({
              status: true,
              message: "Your email already exist",
            });
          }
        }
      }
    }
  };
  return (
    <div id="RegisterModal">
      <div className="modal-container">
        <div className="modal-box">
          <div>
            <input
              id="register-username"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <input
              id="register-email"
              type="text"
              placeholder="Email"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <input
              id="register-password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <input
              id="register-password2"
              type="password"
              placeholder="Re-type Password"
              onChange={(e) => {
                handleChange(e);
              }}
              onKeyPress={(e) => handleKeyUp(e)}
            />
          </div>
        </div>
        <div className="modal-box">
          {errMessage.status ? (
            <div className="err-msg">{errMessage.message}</div>
          ) : null}
        </div>
        <div className="modal-box">
          <div
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Complete
          </div>
          <div>
            <span>Already have an account?</span>
            <Link to="/login">
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
