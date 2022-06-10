import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";
import getCurrentDate from "../functions/getCurrentDate";

const NAMESPACE = "Bid";

const attendBid = (req: Request, res: Response, next: NextFunction) => {};
const updateBid = (req: Request, res: Response, next: NextFunction) => {};
const finishBid = (req: Request, res: Response, next: NextFunction) => {};

export default {
  attendBid,
  updateBid,
  finishBid,
};
