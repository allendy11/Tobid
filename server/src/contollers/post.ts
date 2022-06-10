import { Request, Response, NextFunction } from "express";
import getCurrentDate from "../functions/getCurrentDate";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";

const NAMESPACE = "Post";
//! result interface 필요

const allPosts = (req: Request, res: Response, next: NextFunction) => {
  Connect()
    .then((connection: any) => {
      const query = `SELECT * FROM posts INNER JOIN users ON posts.user_id = users.id WHERE users.id = ?`;
      const params = [res.locals.jwt.id];
      Query(connection, query, params)
        .then((result: any) => {
          logging.info(NAMESPACE, `[allPosts] [id:${res.locals.jwt.id}]`);
          res.status(200).json({
            message: `Get all post`,
            posts: result,
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, `[allPosts-Query] ${error.message}`);
          res.status(500).json({
            message: error.message,
            error,
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, `[allPosts-Connect] ${error.message}`);
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};
const getPost = (req: Request, res: Response, next: NextFunction) => {
  Connect()
    .then((connection: any) => {
      const query = `SELECT * FROM posts INNER JOIN users ON posts.user_id = users.id WHERE (users.id = ? AND posts.id = ?`;
      const params = [res.locals.jwt.id, req.params.id];
      Query(connection, query, params)
        .then((result: any) => {
          logging.info(
            NAMESPACE,
            `[getPost-success] [userId:${res.locals.jwt.id}] [postId: ${req.params.id}]`
          );
          res.status(200).json({
            message: `Get post id:${req.params.id}`,
            post: result[0],
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, `[getPost-Query] ${error.message}`);
          res.status(500).json({
            message: error.message,
            error,
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, `[getPost-Connect] ${error.message}`);
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};
const writePost = (req: Request, res: Response, next: NextFunction) => {};
const updatePost = (req: Request, res: Response, next: NextFunction) => {};
const deletePost = (req: Request, res: Response, next: NextFunction) => {};

export default {
  allPosts,
  getPost,
  writePost,
  updatePost,
  deletePost,
};
