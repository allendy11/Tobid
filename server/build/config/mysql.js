"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.Connect = void 0;
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("./config"));
const development = {
    host: config_1.default.mysql.host,
    user: config_1.default.mysql.user,
    password: config_1.default.mysql.password,
    database: config_1.default.mysql.database,
};
const Connect = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql_1.default.createConnection(development);
        connection.connect((error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(connection);
            }
        });
    });
};
exports.Connect = Connect;
const Query = (connection, query, params) => {
    if (params) {
        return new Promise((resolve, reject) => {
            connection.query(query, params, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                    // connection.end();
                }
            });
        });
    }
    else {
        return new Promise((resolve, reject) => {
            connection.query(query, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                    // connection.end();
                }
            });
        });
    }
};
exports.Query = Query;
