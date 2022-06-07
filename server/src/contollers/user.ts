import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import logging from "../config/logging";
import config from "../config/config";
import { Connect, Query } from "../config/mysql";
import IMySQLResult from "../interface/result";

const NAMESPACE = "User";

// verify token
const validateToken = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Token is validated`);
  res.status(200).json({
    message: "Authorized",
  });
};

// signup
const register = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      res.status(500).json({
        message: hashError.message,
        hashError,
      });
    } else {
      var query = `INSERT INTO users (username, email, password) VALUES (?,?,?)`;
      const params = [username, email, hash];
      Connect()
        .then((connection: any) => {
          Query(connection, query, params)
            .then((result: any) => {
              logging.info(NAMESPACE, `Inserted user [id: ${result.insertId}]`);
              res.status(201).json(result);
            })
            .catch((error) => {
              logging.error(NAMESPACE, error.message);
              res.status(500).json({
                message: error.message,
                error,
              });
            });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message);
          res.status(500).json({
            message: error.message,
            error,
          });
        });
    }
  });
};

// login
const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
};
const deleteAccount = (req: Request, res: Response, next: NextFunction) => {};

export default {
  validateToken,
  register,
  login,
};
