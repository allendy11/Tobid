"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const mysql_1 = require("../config/mysql");
const getCurrentDate_1 = __importDefault(require("../functions/getCurrentDate"));
const NAMESPACE = "Bid";
const allBid = (req, res, next) => {
    (0, mysql_1.Connect)()
        .then((connection) => {
        const query = `SELECT bid.id, bid.bidPrice, posts.title, posts.contents, posts.startingPrice, posts.currentPrice, posts.winnerId, posts.image FROM bid INNER JOIN posts ON bid.post_id = posts.id WHERE bid.user_id = ?`;
        const params = [res.locals.jwt.id];
        (0, mysql_1.Query)(connection, query, params)
            .then((result) => {
            logging_1.default.info(NAMESPACE, `[getBid-Success]`);
            res.status(200).json({
                message: "Get all your bid",
                data: result[0],
            });
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, `[getBid-Query] ${error.message}`);
            res.status(500).json({
                message: error.message,
                error,
            });
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, `[getBid-Connect] ${error.message}`);
        res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const attendBid = (req, res, next) => {
    const { bidPrice } = req.body;
    const currentDate = (0, getCurrentDate_1.default)();
    (0, mysql_1.Connect)()
        .then((connection) => {
        const query = `SELECT currentPrice, user_id FROM posts WHERE (id = ?)`;
        const params = [req.params.id];
        (0, mysql_1.Query)(connection, query, params)
            .then((result) => {
            // 본인은 참여 불가
            if (result[0].user_id === res.locals.jwt.id) {
                res.status(405).json({
                    message: "Not allowed, you can attend other's bid only",
                });
            }
            else {
                const currentPrice = result[0].currentPrice;
                // 경매가격이 현재가격보다 높아야 함
                if (currentPrice >= bidPrice) {
                    res.status(405).json({
                        message: "Not allowed, need higher price than currentPrice",
                    });
                }
                else {
                    const query = `SELECT * FROM bid WHERE (user_id = ? AND post_id = ?)`;
                    const params = [res.locals.jwt.id, req.params.id];
                    (0, mysql_1.Query)(connection, query, params)
                        .then((result) => {
                        // 이미 참여 했던 경우 -> updateBid 로 요청해야됨
                        if (result.length) {
                            res.status(405).json({
                                message: "Not allowed. you have to request at updateBid",
                            });
                        }
                        else {
                            const query = `INSERT INTO bid (user_id, post_id, bidPrice, created_at, updated_at) VALUES (?,?,?,?,?)`;
                            const params = [
                                res.locals.jwt.id,
                                req.params.id,
                                bidPrice,
                                currentDate,
                                currentDate,
                            ];
                            (0, mysql_1.Query)(connection, query, params)
                                .then((result) => {
                                // 현재가격 수정
                                const query = `UPDATE posts SET currentPrice = ?, winnerId= ?, updated_at = ? WHERE id = ?`;
                                const params = [
                                    bidPrice,
                                    res.locals.jwt.id,
                                    currentDate,
                                    req.params.id,
                                ];
                                (0, mysql_1.Query)(connection, query, params)
                                    .then((result) => {
                                    // 성공
                                    logging_1.default.info(NAMESPACE, `[attendBid-success]`);
                                    res.status(201).json({
                                        message: `Bid success, [userId:${res.locals.jwt.id}, postId:${req.params.id}, currentPrice:${bidPrice}]`,
                                        result,
                                    });
                                })
                                    .catch((error) => {
                                    logging_1.default.error(NAMESPACE, `[attendBid-Query-4] ${error.message}`);
                                    res
                                        .status(500)
                                        .json({ message: error.message, error });
                                });
                            })
                                .catch((error) => {
                                logging_1.default.error(NAMESPACE, `[attendBid-Query-3] ${error.message}`);
                                res.status(500).json({
                                    message: error.message,
                                    error,
                                });
                            });
                        }
                    })
                        .catch((error) => {
                        logging_1.default.error(NAMESPACE, `[attendBid-Query-2] ${error.message}`);
                    });
                }
            }
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, `[attendBid-Query-1] ${error.message}`);
            res.status(500).json({
                message: error.message,
                error,
            });
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, `[attendBid-Connect] ${error.message}`);
        res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const updateBid = (req, res, next) => {
    const { bidPrice } = req.body;
    const currentDate = (0, getCurrentDate_1.default)();
    (0, mysql_1.Connect)()
        .then((connection) => {
        const query = `SELECT * FROM posts WHERE id = ?`;
        const params = [req.params.id];
        (0, mysql_1.Query)(connection, query, params)
            .then((result) => {
            // 본인 참여 불가
            if (res.locals.jwt.id === result[0].user_id) {
                res.status(405).json({
                    message: `Not Allowed, you can attend/update other's auction`,
                });
            }
            else {
                // 경매가격이 현재가격보다 높은지 확인
                const currentPrice = result[0].currentPrice;
                if (currentPrice >= bidPrice) {
                    res.status(405).json({
                        message: `Not Allewed, need higher price than ${currentPrice}`,
                    });
                }
                else {
                    const query = `UPDATE bid SET bidPrice = ?, updated_at = ? WHERE user_id = ? AND post_id = ?`;
                    const params = [
                        bidPrice,
                        currentDate,
                        res.locals.jwt.id,
                        req.params.id,
                    ];
                    (0, mysql_1.Query)(connection, query, params)
                        .then((result) => {
                        const query = `UPDATE posts SET currentPrice = ?, winnerId = ?, updated_at = ? WHERE id = ?`;
                        const params = [
                            currentPrice,
                            res.locals.jwt.id,
                            currentDate,
                            req.params.id,
                        ];
                        (0, mysql_1.Query)(connection, query, params)
                            .then((result) => {
                            logging_1.default.info(NAMESPACE, `[updateBid-success]`);
                            // 204 코드로 해도 된다. (no contents)
                            res.status(200).json({
                                result,
                            });
                        })
                            .catch((error) => {
                            logging_1.default.error(NAMESPACE, `[updateBid-Query-3] ${error.message}`);
                            res.status(500).json({
                                message: error.message,
                                error,
                            });
                        });
                    })
                        .catch((error) => {
                        logging_1.default.error(NAMESPACE, `[updateBid-Query-2] ${error.message}`);
                        res.status(500).json({
                            message: error.message,
                            error,
                        });
                    });
                }
            }
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, `[updateBid-Query-1]`);
            res.status(500).json({
                message: error.message,
                error,
            });
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, `[updateBid-Connect] ${error.message}`);
        res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const finishBid = (req, res, next) => {
    (0, mysql_1.Connect)()
        .then((connection) => {
        const query = `SELECT currentPrice, winnerId FROM posts WHERE id = ?`;
        const params = [req.params.id];
        (0, mysql_1.Query)(connection, query, params).then((result) => {
            logging_1.default.info(NAMESPACE, `[finishBid-success]`);
            res.status(200).json({
                message: "finish bid",
                data: result[0],
            });
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, `[finishBid-Connect] ${error.message}`);
        res.status(500).json({
            message: error.message,
        });
    });
};
exports.default = {
    allBid,
    attendBid,
    updateBid,
    finishBid,
};
