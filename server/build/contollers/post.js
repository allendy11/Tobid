"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getCurrentDate_1 = __importDefault(require("../functions/getCurrentDate"));
const logging_1 = __importDefault(require("../config/logging"));
const mysql_1 = require("../config/mysql");
const NAMESPACE = "Post";
//! result interface 필요
const allPosts = (req, res, next) => {
    (0, mysql_1.Connect)()
        .then((connection) => {
        const query = `SELECT * FROM posts INNER JOIN users ON posts.user_id = users.id WHERE users.id = ?`;
        const params = [res.locals.jwt.id];
        (0, mysql_1.Query)(connection, query, params)
            .then((result) => {
            logging_1.default.info(NAMESPACE, `[allPosts] [id:${res.locals.jwt.id}]`);
            res.status(200).json({
                message: `Get all post`,
                posts: result,
            });
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, `[allPosts-Query] ${error.message}`);
            res.status(500).json({
                message: error.message,
                error,
            });
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, `[allPosts-Connect] ${error.message}`);
        res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const getPost = (req, res, next) => {
    (0, mysql_1.Connect)()
        .then((connection) => {
        const query = `SELECT * FROM posts INNER JOIN users ON posts.user_id = users.id WHERE (users.id = ? AND posts.id = ?`;
        const params = [res.locals.jwt.id, req.params.id];
        (0, mysql_1.Query)(connection, query, params)
            .then((result) => {
            logging_1.default.info(NAMESPACE, `[getPost-success] [userId:${res.locals.jwt.id}] [postId: ${req.params.id}]`);
            res.status(200).json({
                message: `Get post id:${req.params.id}`,
                post: result[0],
            });
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, `[getPost-Query] ${error.message}`);
            res.status(500).json({
                message: error.message,
                error,
            });
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, `[getPost-Connect] ${error.message}`);
        res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const writePost = (req, res, next) => {
    const { title, contents, price, image } = req.body;
    (0, mysql_1.Connect)()
        .then((connection) => {
        const currentDate = (0, getCurrentDate_1.default)();
        const query = `INSERT INTO posts (title, contents, startingPrice, currentPrice, image, user_id, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)`;
        const params = [
            title,
            contents,
            price,
            price,
            image,
            res.locals.jwt.id,
            currentDate,
            currentDate,
        ];
        (0, mysql_1.Query)(connection, query, params)
            .then((result) => {
            logging_1.default.info(NAMESPACE, `[writePost-success] [userId:${res.locals.jwt.id}] [postId:${result.insertId}]`);
            res.status(201).json({
                message: "Post success",
                result,
            });
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, `[writePost-Query] ${error.message}`);
            res.status(500).json({
                message: error.message,
                error,
            });
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, `[writePost-Connect] ${error.message}`);
        res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const updatePost = (req, res, next) => {
    const { title, contents, price, image } = req.body;
    (0, mysql_1.Connect)()
        .then((connection) => {
        const currentDate = (0, getCurrentDate_1.default)();
        const query = `UPDATE posts SET title=?, contents=?, startingPrice=?, currentPrice=?, image=?, updated_at=? WHERE id=?`;
        const params = [
            title,
            contents,
            price,
            price,
            image,
            currentDate,
            req.params.id,
        ];
        (0, mysql_1.Query)(connection, query, params).then((result) => {
            logging_1.default.info(NAMESPACE, `[updatePost-success] [postId:${req.params.id}]`);
            res.status(200).json({
                message: "Post updated",
                result,
            });
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, `[updatePost-Connect] ${error.message}`);
        res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const deletePost = (req, res, next) => {
    (0, mysql_1.Connect)()
        .then((connection) => {
        const query = `DELETE FROM posts WHERE id = ?`;
        const params = [req.params.id];
        (0, mysql_1.Query)(connection, query, params)
            .then((result) => {
            logging_1.default.info(NAMESPACE, `[deletePost-success] [postId:${req.params.id}]`);
            res.sendStatus(204);
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, `[deletePost-Query] ${error.message}`);
            res.status(500).json({
                message: error.message,
                error,
            });
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, `[deletePost-Connect] ${error.message}`);
        res.status(500).json({
            message: error.message,
            error,
        });
    });
};
exports.default = {
    allPosts,
    getPost,
    writePost,
    updatePost,
    deletePost,
};
