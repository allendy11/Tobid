import { Request, Response, NextFunction } from "express";
import axios, { AxiosError } from "axios";
import logging from "../config/logging";
import signJWT from "../middleware/signJWT";
import KakaoData from "../interface/kakao";
import dotenv from "dotenv";
dotenv.config();

const NAMESPACE = "KAKAO";
const kakao = async (req: Request, res: Response, next: NextFunction) => {
  const url = `https://kauth.kakao.com/oauth/token?client_id=${process.env.KAKAO_CLIENT_ID}&client_secret=${process.env.KAKAO_CLIENT_SECRET}&grant_type=authorization_code&code=${req.body.authorizationCode}&redirect_uri=${process.env.CLIENT_URL_LOCAL}`;
  try {
    await axios({ method: "GET", url }).then(async (tokenRes) => {
      axios({
        method: "GET",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${tokenRes.data.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((userData) => {
        const { email, profile } = userData.data.kakao_account;

        if (!email) {
          res.status(200).json({
            message: "kakao login success",
            token: `${tokenRes.data.access_token}`,
            user: {
              username: profile.nickname,
              email: "",
            },
            loginType: "kakao",
          });
        } else {
          res.status(200).json({
            message: "kakao login success",
            token: `${tokenRes.data.access_token}`,
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
