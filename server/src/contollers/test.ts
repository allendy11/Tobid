import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";

const NAMESPACE = "Test";

const test = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json("work");
};

export default { test };
