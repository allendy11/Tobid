import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Mypage from "./pages/Mypage";
import axios from "axios";
import ErrorModal from "./components/Modal/ErrorModal/ErrorModal";
import Bid from "./pages/Bid";
function App() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [userInfo, setUserInfo] = useState({
    id: 0,
    username: "",
    email: "",
    mobile: "",
    image: "",
    admin: false,
  });
  const [token, setToken] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [errorModal, setErrorModal] = useState({
    status: false,
    message: "",
  });
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
            email: res.data.user.email,
            username: res.data.user.username,
          });
          setToken(res.data.token);
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
      if (code) {
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_URL_LOCAL}/user/google`,
          data: {
            authorizationCode: code,
          },
        }).then((res) => {
          setUserInfo({
            ...userInfo,
            email: res.data.user.email,
            username: res.data.user.username,
          });
          setToken(res.data.token);
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
        const _userInfo_local = userInfo_local && JSON.parse(userInfo_local);
        setUserInfo({
          ...userInfo,
          id: _userInfo_local.id,
          username: _userInfo_local.username,
          email: _userInfo_local.email,
          mobile: _userInfo_local.mobile,
          image: _userInfo_local.image,
          admin: _userInfo_local.admin,
        });
        setToken(_token_local);
      }
    }
  }, [loginStatus]);

  // window resize
  window.addEventListener("resize", (e) => {
    setInnerWidth(window.innerWidth);
  });
  return (
    <div id="App">
      <BrowserRouter>
        <Nav
          innerWidth={innerWidth}
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
          <Route
            path="/mypage"
            element={
              <Mypage
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setErrorModal={setErrorModal}
              />
            }
          />
          <Route path="/bid" element={<Bid />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      {errorModal.status ? (
        <div className="errorModal-background">
          <div className="errorModal-background-a">
            <ErrorModal errorModal={errorModal} setErrorModal={setErrorModal} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
