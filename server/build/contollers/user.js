"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logging_1 = __importDefault(require("../config/logging"));
const mysql_1 = require("../config/mysql");
// import config from "../config/config";
const signJWT_1 = __importDefault(require("../middleware/signJWT"));
const getCurrentDate_1 = __importDefault(require("../functions/getCurrentDate"));
const NAMESPACE = "User";
// verify token
const validateToken = (req, res, next) => {
    logging_1.default.info(NAMESPACE, `Token is validated`);
    res.status(200).json({
        message: "Authorized",
        tokenData: res.locals.jwt,
    });
};
// signup
const register = (req, res, next) => {
    const { username, email, password } = req.body;
    bcryptjs_1.default.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            logging_1.default.error(NAMESPACE, hashError.message);
            res.status(500).json({
                message: hashError.message,
                hashError,
            });
        }
        else {
            var query = `INSERT INTO users (username, email, password, created_at, updated_at) VALUES (?,?,?,?,?)`;
            const currentDate = (0, getCurrentDate_1.default)();
            const params = [username, email, hash, currentDate, currentDate];
            (0, mysql_1.Connect)()
                .then((connection) => {
                (0, mysql_1.Query)(connection, query, params)
                    .then((result) => {
                    logging_1.default.info(NAMESPACE, `Inserted user [id: ${result.insertId}]`);
                    res.status(201).json(result);
                })
                    .catch((error) => {
                    logging_1.default.error(NAMESPACE, `[register-Query]`);
                    res.status(500).json({
                        message: error.message,
                        error,
                    });
                });
            })
                .catch((error) => {
                logging_1.default.error(NAMESPACE, `[register-Connect]`);
                res.status(500).json({
                    message: error.message,
                    error,
                });
            });
        }
    });
};
// login
const login = (req, res, next) => {
    const { email, password } = req.body;
    (0, mysql_1.Connect)()
        .then((connection) => {
        const query = `SELECT * FROM users WHERE (email = ?)`;
        const params = [email];
        (0, mysql_1.Query)(connection, query, params)
            .then((userData) => {
            bcryptjs_1.default.compare(password, userData[0].password, (error, result) => {
                if (error) {
                    logging_1.default.error(NAMESPACE, "Password Mismatch");
                    res.status(401).json({
                        message: "Password Mismatch",
                        error,
                    });
                }
                else {
                    (0, signJWT_1.default)(userData[0], (error, token) => {
                        if (error) {
                            logging_1.default.error(NAMESPACE, "Unable to sign JWT");
                            res.status(401).json({
                                message: "Unable to sign JWT",
                                error,
                            });
                        }
                        else {
                            logging_1.default.info(NAMESPACE, "Auth successful");
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
            logging_1.default.error(NAMESPACE, `[login-Query] ${error.message}`);
            res.status(500).json({
                message: error.message,
                error,
            });
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, `[login-Connect] ${error.message}`);
        res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const updateUserInfo = (req, res, next) => {
    const { username, email, mobile, image } = req.body;
    (0, mysql_1.Connect)()
        .then((connection) => {
        const query = `UPDATE users SET username=?, mobile=?, image=?, updated_at=? WHERE email=?`;
        const currentDate = (0, getCurrentDate_1.default)();
        const params = [username, mobile, image, currentDate, email];
        (0, mysql_1.Query)(connection, query, params)
            .then((result) => {
            logging_1.default.info(NAMESPACE, `profile updated`);
            res.status(200).json({
                message: "porfile updated",
                result,
            });
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, `[update-Query] ${error.message}`);
            res.status(500).json({
                message: error.message,
                error,
            });
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, `[update-Connect] ${error.message}`);
        res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const deleteAccount = (req, res, next) => {
    const { email } = req.body;
    (0, mysql_1.Connect)()
        .then((connection) => {
        const query = `DELETE FROM users WHERE email = ?`;
        const params = [email];
        (0, mysql_1.Query)(connection, query, params)
            .then((result) => {
            logging_1.default.info(NAMESPACE, `Account Delete`);
            res.status(200).json({
                message: "Account delete",
                result,
            });
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, `[deleteAccount-Query] ${error.message}`);
            res.status(500).json({
                message: error.message,
                error,
            });
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, `[deleteAccount-Connect] ${error.message}`);
        res.status(500).json({
            message: error.message,
            error,
        });
    });
};
exports.default = {
    validateToken,
    register,
    login,
    updateUserInfo,
    deleteAccount,
};
