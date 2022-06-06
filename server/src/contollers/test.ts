import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";

const NAMESPACE = "Test";

const test = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Connecting success`);
  res.status(200).json({
    message: "test ok",
  });
};

export default test;
