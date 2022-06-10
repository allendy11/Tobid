import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";

const NAMESPACE = "Test";

// 2중 쿼리문 테스트
const test = (req: Request, res: Response, next: NextFunction) => {
  Connect()
    .then((connection: any) => {
      const query = `SELECT * FROM users WHERE (id = ?)`;
      const params = [req.body.id];
      Query(connection, query, params)
        .then((result: any) => {
          const query = `UPDATE users SET username=? WHERE id = ?`;
          const params = [req.body.username, result[0].id];
          Query(connection, query, params)
            .then((result: any) => {
              res.status(200).json({
                message: "test success",
                result,
              });
            })
            .catch((error) => {
              logging.error(NAMESPACE, "22222query-error", error.message);
              res.status(500).json({
                error,
              });
            });
        })
        .catch((error) => {
          logging.error(NAMESPACE, "query-error", error.message);
          res.status(500).json({
            error,
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, "connect-error", error.message);
      res.status(500).json({
        error,
      });
    });
};

export default { test };
