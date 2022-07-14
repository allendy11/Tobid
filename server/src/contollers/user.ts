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
  var query = "SELECT * FROM users WHERE username = ? OR email = ?";
  var params = [username, email];
  Connect()
    .then((connection) => {
      Query<IUser[]>(connection, query, params)
        .then((result) => {
          if (result.length !== 0) {
            res.status(409).json({
              message: "conflict userInfo",
            });
          } else {
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
                const params = [
                  username,
                  email,
                  hash,
                  currentDate,
                  currentDate,
                ];
                Connect()
                  .then((connection) => {
                    Query<IMySQLResult>(connection, query, params)
                      .then((result) => {
                        logging.info(
                          NAMESPACE,
                          `Inserted user [id: ${result.insertId}]`
                        );
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
          }
        })
        .catch((error) => {
          logging.error(NAMESPACE, `[register-Query-1]`);
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, `[register-Connect-1]`);
      res.status(500).json({
        message: error.message,
        error,
      });
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
              logging.error(NAMESPACE, "password not verified");
              res.status(500).json({
                message: "Password not verified",
                error,
              });
            }
            if (!result) {
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
                      id: userData[0].id,
                      username: userData[0].username,
                      email: userData[0].email,
                      mobile: userData[0].mobile,
                      image: userData[0].image,
                      admin: userData[0].admin,
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
// edit username
const updateUserName = (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const id = req.params.id;
  Connect()
    .then((connection) => {
      const query = `UPDATE users SET username=?, updated_at=? WHERE id=?`;
      const currentDate = getCurrentDate();
      const params = [username, currentDate, id];
      console.log(params);
      Query<IMySQLResult>(connection, query, params)
        .then((result) => {
          logging.info(NAMESPACE, `username updated`);
          res.status(200).json({
            message: "username updated",
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
//edit mobile
const updateMobile = (req: Request, res: Response, next: NextFunction) => {
  const mobile = req.body.mobile;
  const id = req.params.id;
  Connect()
    .then((connection) => {
      const query = `UPDATE users SET mobile=?, updated_at=? WHERE id=?`;
      const currentDate = getCurrentDate();
      const params = [mobile, currentDate, id];
      Query<IMySQLResult>(connection, query, params)
        .then((result) => {
          logging.info(NAMESPACE, `mobile updated`);
          res.status(200).json({
            message: "mobile updated",
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
// edit user image
const updateImage = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "trying edit image");
  console.log("file?");
  if (req.file) {
    console.log("yes");
    console.log(req.file);
    console.log(req.file.path);
  }
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
  updateUserName,
  updateMobile,
  updateImage,
  deleteAccount,
};
