"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logging_1 = __importDefault(require("../config/logging"));
const config_1 = __importDefault(require("../config/config"));
const NAMESPACE = "Auth";
const signJWT = (user, cb) => {
    logging_1.default.info(NAMESPACE, `Attempting to sign token`);
    try {
        jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: "HS256",
            expiresIn: config_1.default.server.token.expireTime,
        }, (error, token) => {
            if (error) {
                cb(error, null);
            }
            else {
                cb(null, token);
            }
        });
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, error.message);
        cb(error, null);
    }
};
exports.default = signJWT;
