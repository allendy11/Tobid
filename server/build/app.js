"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logging_1 = __importDefault(require("./config/logging"));
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
const bid_1 = __importDefault(require("./routes/bid"));
const test_1 = __importDefault(require("./routes/test"));
const NAMESPACE = "Server";
const app = (0, express_1.default)();
// common module
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// log
app.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `[METHOD:${req.method}] [URL:${req.url}]`);
    res.on("finish", () => {
        logging_1.default.end(NAMESPACE, `[STATUS:${res.statusCode}]`);
    });
    next();
});
// test
app.use("/test", test_1.default);
// routes
app.use("/user", user_1.default);
app.use("/post", post_1.default);
app.use("/bid", bid_1.default);
// error handling
app.use((req, res, next) => {
    const error = new Error("Not Found");
    res.status(404).json({
        message: error.message,
    });
});
exports.default = app;
