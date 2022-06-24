"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logging_1 = __importDefault(require("../config/logging"));
const config_1 = __importDefault(require("../config/config"));
const NAMESPACE = "Auth";
const verifyJWT = (req, res, next) => {
    var _a;
    logging_1.default.info(NAMESPACE, `validating token`);
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.server.token.secret, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    message: error.message,
                    error,
                });
            }
            else {
                logging_1.default.info(NAMESPACE, `Authorized`);
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        res.status(401).json({
            message: "Unauthorized",
        });
    }
};
exports.default = verifyJWT;
