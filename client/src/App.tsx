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
  const [userData, setUserData] = useState({
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
          setUserData({
            ...userData,
            username: res.data.user.username,
            email: res.data.user.email,
            token: res.data.token,
          });
        });
      }
    } else if (type === "google") {
    }
  };
  useEffect(() => {
    const loginStatusSession = sessionStorage.getItem("loginStatusSession");
    if (loginStatusSession) {
      setLoginStatus(true);
    }
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (!loginStatusSession && authorizationCode) {
      const loginType = sessionStorage.getItem("loginType");
      getAccessToken(authorizationCode, loginType);
    }
    window.location.assign("http://localhost:3000");
  }, []);
  return (
    <div id="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
