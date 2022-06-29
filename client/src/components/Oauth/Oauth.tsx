import React from "react";
import "./Oauth.css";
import dotenv from "dotenv";
dotenv.config();
const Oauth = () => {
  const kakaoLogin = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const client_id = "9e0fef1189320ab5cd9d7869a7c00f5b";
    const api_url = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${process.env.REACT_APP_CLIENT_URL_LOCAL}&response_type=code`;
    window.location.assign(api_url);
  };
  return (
    <div id="Oauth">
      <div className="oauth-container">
        <div className="oauth-box">
          <div>
            <img
              src={process.env.PUBLIC_URL + "images/oauth/google.png"}
              alt="google"
            />
          </div>
          <div>Login with Google</div>
        </div>
        <div className="oauth-box" onClick={(e) => kakaoLogin(e)}>
          <div>
            <img
              src={process.env.PUBLIC_URL + "images/oauth/kakao.png"}
              alt="kakao"
            />
          </div>
          <div>Login with Kakao</div>
        </div>
      </div>
    </div>
  );
};

export default Oauth;
