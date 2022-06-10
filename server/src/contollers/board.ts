import { Request, Response, NextFunction } from "express";
import getCurrentDate from "../functions/getCurrentDate";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";

const allBoard = (req: Request, res: Response, next: NextFunction) => {};
const getBoard = (req: Request, res: Response, next: NextFunction) => {};
const writeBoard = (req: Request, res: Response, next: NextFunction) => {};
const updateBoard = (req: Request, res: Response, next: NextFunction) => {};
const deleteBoard = (req: Request, res: Response, next: NextFunction) => {};

export default {
  allBoard,
  getBoard,
  writeBoard,
  updateBoard,
  deleteBoard,
};
