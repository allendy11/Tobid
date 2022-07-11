import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logging from "../config/logging";
import config from "../config/config";

const NAMESPACE = "Auth";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `validating token`);
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        logging.error(NAMESPACE, `Invalid token`);
        res.status(401).json({
          message: error.message,
          error,
        });
      } else {
        logging.info(NAMESPACE, `Authorized`);
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    logging.error(NAMESPACE, `Unauthorized`);
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default verifyJWT;
