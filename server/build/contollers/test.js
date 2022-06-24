"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const mysql_1 = require("../config/mysql");
const NAMESPACE = "Test";
// 2중 쿼리문 테스트
const test = (req, res, next) => {
    (0, mysql_1.Connect)()
        .then((connection) => {
        const query = `SELECT * FROM users WHERE (id = ?)`;
        const params = [req.body.id];
        (0, mysql_1.Query)(connection, query, params)
            .then((result) => {
            const query = `UPDATE users SET username=? WHERE id = ?`;
            const params = [req.body.username, result[0].id];
            (0, mysql_1.Query)(connection, query, params)
                .then((result) => {
                res.status(200).json({
                    message: "test success",
                    result,
                });
            })
                .catch((error) => {
                logging_1.default.error(NAMESPACE, "22222query-error", error.message);
                res.status(500).json({
                    error,
                });
            });
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, "query-error", error.message);
            res.status(500).json({
                error,
            });
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, "connect-error", error.message);
        res.status(500).json({
            error,
        });
    });
};
exports.default = { test };
