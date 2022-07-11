import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logging from "./config/logging";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import bidRouter from "./routes/bid";
import testRouter from "./routes/test";

const NAMESPACE = "Server";
const app = express();

// common module
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// log
app.use((req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `[METHOD:${req.method}] [URL:${req.url}]`);
  res.on("finish", () => {
    logging.end(NAMESPACE, `[STATUS:${res.statusCode}]`);
  });
  next();
});

// test
app.use("/test", testRouter);

// routes
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/bid", bidRouter);

// error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  res.status(404).json({
    message: error.message,
  });
});
export default app;
