import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";
import getCurrentDate from "../functions/getCurrentDate";

const NAMESPACE = "Bid";

const getAllBid = (req: Request, res: Response, next: NextFunction) => {
  Connect()
    .then((connection: any) => {
      const query = `SELECT bid.id, bid.bidPrice, posts.title, posts.contents, posts.startingPrice, posts.currentPrice, posts.image FROM bid INNER JOIN posts ON bid.post_id = posts.id WHERE bid.user_id = ?`;
      const params = [res.locals.jwt.id];
      Query(connection, query, params)
        .then((result: any) => {
          logging.info(NAMESPACE, `[getBid-Success]`);
          res.status(200).json({
            message: "Get all your bid",
            result,
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, `[getBid-Query] ${error.message}`);
          res.status(500).json({
            message: error.message,
            error,
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, `[getBid-Connect] ${error.message}`);
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};
const attendBid = (req: Request, res: Response, next: NextFunction) => {
  const { bidPrice } = req.body;
  const currentDate = getCurrentDate();
  Connect()
    .then((connection: any) => {
      const query = `SELECT currentPrice, user_id FROM posts WHERE (id = ?)`;
      const params = [req.params.id];
      Query(connection, query, params)
        .then((result: any) => {
          // 본인은 참여 불가
          if (result[0].user_id === res.locals.jwt.id) {
            res.status(405).json({
              message: "Not allowed, you can attend other's bid only",
            });
          } else {
            const currentPrice = result[0].currentPrice;
            // 경매가격이 현재가격보다 높아야 함
            if (currentPrice >= bidPrice) {
              res.status(405).json({
                message: "Not allowed, need higher price than currentPrice",
              });
            } else {
              const query = `SELECT * FROM bid WHERE (user_id = ? AND post_id = ?)`;
              const params = [res.locals.jwt.id, req.params.id];
              Query(connection, query, params)
                .then((result: any) => {
                  // 이미 참여 했던 경우 -> updateBid 로 요청해야됨
                  if (result.length) {
                    res.status(405).json({
                      message: "Not allowed. you have to request at updateBid",
                    });
                  } else {
                    const query = `INSERT INTO bid (user_id, post_id, bidPrice, created_at, updated_at) VALUES (?,?,?,?,?)`;
                    const params = [
                      res.locals.jwt.id,
                      req.params.id,
                      bidPrice,
                      currentDate,
                      currentDate,
                    ];
                    Query(connection, query, params)
                      .then((result: any) => {
                        // 현재가격 수정
                        const query = `UPDATE posts SET currentPrice = ?, updated_at = ? WHERE id = ?`;
                        const params = [bidPrice, currentDate, req.params.id];
                        Query(connection, query, params)
                          .then((result: any) => {
                            // 성공
                            logging.info(NAMESPACE, `[attendBid-success]`);
                            res.status(201).json({
                              message: `Bid success, [userId:${res.locals.jwt.id}, postId:${req.params.id}, currentPrice:${bidPrice}]`,
                            });
                          })
                          .catch((error) => {
                            logging.error(
                              NAMESPACE,
                              `[attendBid-Query-4] ${error.message}`
                            );
                            res
                              .status(500)
                              .json({ message: error.message, error });
                          });
                      })
                      .catch((error) => {
                        logging.error(
                          NAMESPACE,
                          `[attendBid-Query-3] ${error.message}`
                        );
                        res.status(500).json({
                          message: error.message,
                          error,
                        });
                      });
                  }
                })
                .catch((error) => {
                  logging.error(
                    NAMESPACE,
                    `[attendBid-Query-2] ${error.message}`
                  );
                });
            }
          }
        })
        .catch((error) => {
          logging.error(NAMESPACE, `[attendBid-Query-1] ${error.message}`);
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
  getAllBid,
  attendBid,
  updateBid,
  finishBid,
};
