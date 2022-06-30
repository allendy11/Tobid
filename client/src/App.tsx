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
            token: res.data.token,
            email: res.data.user.email,
            username: res.data.user.username,
          });
          setLoginStatus(true);
          localStorage.setItem("loginStatus_local", JSON.stringify(true));
          localStorage.setItem("token_local", JSON.stringify(res.data.token));
          localStorage.setItem(
            "userInfo_local",
            JSON.stringify({
              username: res.data.user.username,
              email: res.data.user.email,
            })
          );
          window.location.replace(`${process.env.REACT_APP_CLIENT_URL_LOCAL}`);
        });
      }
    } else if (type === "google") {
    }
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    const loginStatus_local = localStorage.getItem("loginStatus_local");

    if (authorizationCode) {
      const loginType_local = localStorage.getItem("loginType_local");
      getAccessToken(authorizationCode, loginType_local);
    }
    if (loginStatus_local && JSON.parse(loginStatus_local)) {
      setLoginStatus(true);
    }
    const token_local = localStorage.getItem("token_local");
    const userInfo_local = localStorage.getItem("userInfo_local");
    if (token_local) {
      if (userInfo_local && JSON.parse(userInfo_local)) {
        const _token_local = JSON.parse(token_local);
        const _userInfo_local: { username: string; email: string } =
          userInfo_local && JSON.parse(userInfo_local);
        setUserInfo({
          ...userInfo,
          username: _userInfo_local.username,
          email: _userInfo_local.email,
          token: _token_local,
        });
      }
    }
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
