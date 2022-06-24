"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const info = (namespace, message) => {
    console.info(`[INFO] [${namespace}] ${message}`);
};
const error = (namespace, message, error) => {
    if (error) {
        console.info(`[ERROR] [${namespace}] ${message}`);
        console.error(error);
    }
    else {
        console.info(`[ERROR] [${namespace}] ${message} `);
    }
};
const end = (namespace, message) => {
    console.info(`[END] [${namespace}] ${message}`);
};
exports.default = {
    info,
    error,
    end,
};
