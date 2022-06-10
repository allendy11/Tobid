import jwt from "jsonwebtoken";
import logging from "../config/logging";
import config from "../config/config";
import IUser from "../interface/user";

const NAMESPACE = "Auth";

const signJWT = (
  user: IUser,
  cb: (error: Error | null, token: string | null | undefined) => void
) => {
  logging.info(NAMESPACE, `Attempting to sign token`);
  try {
    jwt.sign(
      { email: user.id },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: config.server.token.expireTime,
      },
      (error, token) => {
        if (error) {
          cb(error, null);
        } else {
          cb(null, token);
        }
      }
    );
  } catch (error: any) {
    logging.error(NAMESPACE, error.message);
    cb(error, null);
  }
};

export default signJWT;
