import { Request, Response, NextFunction } from "express";
import axios, { AxiosError } from "axios";
import logging from "../config/logging";
import dotenv from "dotenv";
dotenv.config();

const NAMESPACE = "GOOGLE";
const google = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationCode = req.body.authorizationCode;
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const redirect_uri = process.env.CLIENT_URL_LOCAL;
  const url = `https://oauth2.googleapis.com/token?code=${authorizationCode}&client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&redirect_uri=${redirect_uri}&grant_type=authorization_code`;
  try {
    await axios({
      method: "POST",
      url,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }).then((tokenData) => {
      axios({
        method: "GET",
        url: "https://www.googleapis.com/oauth2/v3/userinfo",
        headers: {
          Authorization: `Bearer ${tokenData.data.access_token}`,
        },
      }).then((userInfo) => {
        console.log(userInfo);
      });
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err.message);
    }
  }
};
export default google;
