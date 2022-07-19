import React from "react";
import "./Oauth.css";
import dotenv from "dotenv";
import kakaoLogo from "../../images/oauth/kakao.png";
import googleLogo from "../../images/oauth/google.png";
dotenv.config();
const Oauth = () => {
  const kakaoLogin = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    localStorage.setItem("loginType_local", "kakao");
    const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_CLIENT_URL_LOCAL;
    const kakao_login_url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code`;
    window.location.replace(kakao_login_url);
  };
  const googleLogin = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    localStorage.setItem("loginType_local", "google");
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_CLIENT_URL_LOCAL;
    const google_login_url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
    window.location.replace(google_login_url);
  };

  return (
    <div id="Oauth">
      <div className="oauth-container">
        <div className="oauth-box" onClick={(e) => googleLogin(e)}>
          <div>
            <img src={googleLogo} alt="google" />
          </div>
          <div>Login with Google</div>
        </div>
        <div className="oauth-box" onClick={(e) => kakaoLogin(e)}>
          <div>
            <img src={kakaoLogo} alt="kakao" />
          </div>
          <div>Login with Kakao</div>
        </div>
      </div>
    </div>
  );
};

export default Oauth;
