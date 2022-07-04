import { Request, Response, NextFunction } from "express";
import axios, { AxiosError } from "axios";
import logging from "../config/logging";
import KakaoData from "../interface/kakao";
import dotenv from "dotenv";
dotenv.config();

const NAMESPACE = "KAKAO";
const kakao = async (req: Request, res: Response, next: NextFunction) => {
  const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
  const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
  const authorizationCode = req.body.authorizationCode;
  const redirect_uri = process.env.CLIENT_URL_LOCAL;
  const url = `https://kauth.kakao.com/oauth/token?client_id=${KAKAO_CLIENT_ID}&client_secret=${KAKAO_CLIENT_SECRET}&grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${redirect_uri}`;
  try {
    await axios({ method: "GET", url }).then(async (tokenData) => {
      axios({
        method: "GET",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${tokenData.data.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((userData) => {
        const { email, profile } = userData.data.kakao_account;

        if (!email) {
          res.status(200).json({
            message: "kakao login success",
            token: `${tokenData.data.access_token}`,
            user: {
              username: profile.nickname,
              email: "",
            },
            loginType: "kakao",
          });
        } else {
          res.status(200).json({
            message: "kakao login success",
            token: `${tokenData.data.access_token}`,
            user: {
              username: profile.nickname,
              email,
            },
            loginType: "kakao",
          });
        }
      });
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      res.status(500).json({ message: err.message });
    }
  }
};

export default kakao;
