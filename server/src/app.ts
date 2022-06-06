import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user";
import logging from "./config/logging";

const NAMESPACE = "Server";
const app = express();

// common module
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// log
app.use((req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `[METHOD:${req.method}] [URL:${req.url}]`);
  res.on("finish", () => {
    logging.info(NAMESPACE, `[STATUS:${res.statusCode}]`);
  });
  next();
});

// routes
app.use("/", userRouter);

// error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  res.status(404).json({
    message: error.message,
  });
});
export default app;
