import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";
import getCurrentDate from "../functions/getCurrentDate";

const NAMESPACE = "Bid";

const attendBid = (req: Request, res: Response, next: NextFunction) => {
  const { bid_price } = req.body;
  const currentDate = getCurrentDate();
  Connect()
    .then((connection: any) => {
      const query = `INSERT INTO bid (user_id, bid_price, created_at, updated_at) VALUES (?,?,?,?)`;
      const params = [res.locals.jwt.id, bid_price, currentDate, currentDate];
      console.log("work");
      Query(connection, query, params)
        .then((result: any) => {
          logging.info(NAMESPACE, `[attendBid-success]`);
          const query = `INSERT INTO bid_post (bid_id, post_id, created_at, updated_at) VALUES (?,?,?,?)`;
          const params = [
            result.insertId,
            req.params.id,
            currentDate,
            currentDate,
          ];
          Query(connection, query, params)
            .then((result: any) => {
              logging.info(NAMESPACE, `[attendBid-Success(2th)]`);
              res.json({
                message: `Attend bid success [userId: ${res.locals.jwt.id}, postId: ${req.params.id}, bidPrice: ${bid_price}]`,
              });
            })
            .catch((error) => {
              logging.error(
                NAMESPACE,
                `[attendBid-Query(2th)] ${error.message}`
              );
              res.status(500).json({
                message: error.message,
                error,
              });
            });
        })
        .catch((error) => {
          logging.error(NAMESPACE, `[attendBid-Query] ${error.message}`);
          res.status(500).json({
            message: error.message,
            error,
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, `[attendBid-Connect] ${error.message}`);
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};
const updateBid = (req: Request, res: Response, next: NextFunction) => {};
const finishBid = (req: Request, res: Response, next: NextFunction) => {};

export default {
  attendBid,
  updateBid,
  finishBid,
};
