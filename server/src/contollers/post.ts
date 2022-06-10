import { Request, Response, NextFunction } from "express";
import getCurrentDate from "../functions/getCurrentDate";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";

const allPost = (req: Request, res: Response, next: NextFunction) => {};
const getPost = (req: Request, res: Response, next: NextFunction) => {};
const writePost = (req: Request, res: Response, next: NextFunction) => {};
const updatePost = (req: Request, res: Response, next: NextFunction) => {};
const deletePost = (req: Request, res: Response, next: NextFunction) => {};

export default {
  allPost,
  getPost,
  writePost,
  updatePost,
  deletePost,
};
