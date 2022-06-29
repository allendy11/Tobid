import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import axios from "axios";
function App() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    token: "",
  });
  const [loginStatus, setLoginStatus] = useState(false);
  const getAccessToken = (code: string | null, type: string | null) => {
    if (type === "kakao") {
      if (code) {
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_URL_LOCAL}/user/kakao`,
          data: { authorizationCode: code },
        }).then((res) => {
          setUserInfo({
            ...userInfo,
            username: res.data.user.username,
            email: res.data.user.email,
            token: res.data.token,
          });
          localStorage.setItem("loginStatus_local", JSON.stringify(true));
        });
      }
    } else if (type === "google") {
    }
  };
  useEffect(() => {
    const loginStatus_local = localStorage.getItem("loginStatus_local");
    if (loginStatus_local && JSON.parse(loginStatus_local)) {
      setLoginStatus(true);
    }
    const token_local = localStorage.getItem("token_local");
    if (token_local) {
      setUserInfo({
        ...userInfo,
        token: token_local,
      });
    }
    const userInfo_local = localStorage.getItem("userInfo_local");
    if (userInfo_local && JSON.parse(userInfo_local)) {
      const _userInfo_local: { username: string; email: string } =
        userInfo_local && JSON.parse(userInfo_local);
      setUserInfo({
        ...userInfo,
        username: _userInfo_local.username,
        email: _userInfo_local.email,
      });
    }
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (!loginStatus_local && authorizationCode) {
      const loginType_local = localStorage.getItem("loginType_local");
      getAccessToken(authorizationCode, loginType_local);
      window.location.assign(`${process.env.REACT_APP_CLIENT_URL_LOCAL}`);
    }
    // console.log(loginStatus_local);
    // console.log(token_local);
    // console.log(userInfo_local);
  }, [loginStatus]);
  return (
    <div id="App">
      <BrowserRouter>
        <Nav
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          loginStatus={loginStatus}
          setLoginStatus={setLoginStatus}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={<Login userInfo={userInfo} setUserInfo={setUserInfo} />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
