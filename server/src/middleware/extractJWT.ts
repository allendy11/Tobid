import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logging from "../config/logging";
import config from "../config/config";

const NAMESPACE = "Auth";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `validating token`);
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, config.server.token.secret, (error, result) => {
      if (error) {
        res.status(401).json({
          message: error.message,
          error,
        });
      } else {
        res.locals.jwt = result;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default extractJWT;
