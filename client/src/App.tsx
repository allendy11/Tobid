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
  const getAccessToken = (code: string | null) => {
    if (code) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL_LOCAL}/user/kakao`,
        data: { authorizationCode: code },
      }).then((res) => {
        console.log(res.data);
      });
    }
    // axios({
    //   method: "GET",
    //   url: "https://kapi.kakao.com/v2/user/me",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // }).then((res) => {
    //   console.log(res.data);
    // });
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    getAccessToken(authorizationCode);
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
