import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";
import IUser from "../interface/user";

const NAMESPACE = "Test";

const test = (req: Request, res: Response, next: NextFunction) => {
  const query = "SELECT * FROM users";
  Connect()
    .then((connection: any) => {
      Query(connection, query)
        .then((users: any) => {
          return res.status(200).json({
            users,
            count: users.length,
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message);

          return res.status(500).json({
            message: error.message,
            error,
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message);

      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default test;
