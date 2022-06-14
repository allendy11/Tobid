import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";
// import config from "../config/config";
import signJWT from "../middleware/signJWT";
import getCurrentDate from "../functions/getCurrentDate";
import IMySQLResult from "../interface/result";
import IUser from "../interface/user";

const NAMESPACE = "User";

// verify token
const validateToken = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Token is validated`);
  res.status(200).json({
    message: "Authorized",
    tokenData: res.locals.jwt,
  });
};

// signup
const register = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      logging.error(NAMESPACE, hashError.message);
      res.status(500).json({
        message: hashError.message,
        hashError,
      });
    } else {
      var query = `INSERT INTO users (username, email, password, created_at, updated_at) VALUES (?,?,?,?,?)`;
      const currentDate = getCurrentDate();
      const params = [username, email, hash, currentDate, currentDate];
      Connect()
        .then((connection) => {
          Query<IMySQLResult>(connection, query, params)
            .then((result) => {
              logging.info(NAMESPACE, `Inserted user [id: ${result.insertId}]`);
              res.status(201).json(result);
            })
            .catch((error) => {
              logging.error(NAMESPACE, `[register-Query]`);
              res.status(500).json({
                message: error.message,
                error,
              });
            });
        })
        .catch((error) => {
          logging.error(NAMESPACE, `[register-Connect]`);
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
  Connect()
    .then((connection) => {
      const query = `SELECT * FROM users WHERE (email = ?)`;
      const params = [email];
      Query<IUser[]>(connection, query, params)
        .then((userData) => {
          bcryptjs.compare(password, userData[0].password, (error, result) => {
            if (error) {
              logging.error(NAMESPACE, "Password Mismatch");
              res.status(401).json({
                message: "Password Mismatch",
                error,
              });
            } else {
              signJWT(userData[0], (error, token) => {
                if (error) {
                  logging.error(NAMESPACE, "Unable to sign JWT");
                  res.status(401).json({
                    message: "Unable to sign JWT",
                    error,
                  });
                } else {
                  logging.info(NAMESPACE, "Auth successful");
                  res.status(200).json({
                    message: "Auth successful",
                    token,
                    user: {
                      username: userData[0].username,
                      email: userData[0].email,
                    },
                  });
                }
              });
            }
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, `[login-Query] ${error.message}`);
          res.status(500).json({
            message: error.message,
            error,
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, `[login-Connect] ${error.message}`);
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};
const updateUserInfo = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, mobile, image } = req.body;
  Connect()
    .then((connection) => {
      const query = `UPDATE users SET username=?, mobile=?, image=?, updated_at=? WHERE email=?`;
      const currentDate = getCurrentDate();
      const params = [username, mobile, image, currentDate, email];
      Query<IMySQLResult>(connection, query, params)
        .then((result) => {
          logging.info(NAMESPACE, `profile updated`);
          res.status(200).json({
            message: "porfile updated",
            result,
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, `[update-Query] ${error.message}`);
          res.status(500).json({
            message: error.message,
            error,
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, `[update-Connect] ${error.message}`);
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};
const deleteAccount = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  Connect()
    .then((connection) => {
      const query = `DELETE FROM users WHERE email = ?`;
      const params = [email];
      Query<IMySQLResult>(connection, query, params)
        .then((result) => {
          logging.info(NAMESPACE, `Account Delete`);
          res.status(200).json({
            message: "Account delete",
            result,
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, `[deleteAccount-Query] ${error.message}`);
          res.status(500).json({
            message: error.message,
            error,
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, `[deleteAccount-Connect] ${error.message}`);
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default {
  validateToken,
  register,
  login,
  updateUserInfo,
  deleteAccount,
};
