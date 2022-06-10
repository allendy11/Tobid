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
const writePost = (req: Request, res: Response, next: NextFunction) => {
  const { title, contents, price, image } = req.body;
  Connect()
    .then((connection: any) => {
      const currentDate = getCurrentDate();
      const query = `INSERT INTO posts (title, contents, price, image, user_id, created_at, updated_at) VALUES (?,?,?,?,?,?,?)`;
      const params = [
        title,
        contents,
        price,
        image,
        res.locals.jwt.id,
        currentDate,
        currentDate,
      ];
      Query(connection, query, params)
        .then((result: any) => {
          logging.info(
            NAMESPACE,
            `[writePost-success] [userId:${res.locals.jwt.id}] [postId:${result.insertId}]`
          );
          res.status(201).json({
            message: "Post success",
            result,
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, `[writePost-Query] ${error.message}`);
          res.status(500).json({
            message: error.message,
            error,
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, `[writePost-Connect] ${error.message}`);
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};
const updatePost = (req: Request, res: Response, next: NextFunction) => {
  const { title, contents, price, image } = req.body;
  Connect()
    .then((connection: any) => {
      const currentDate = getCurrentDate();
      const query = `UPDATE posts SET title=?, contents=?, price=?, image=?, updated_at=? WHERE id=?`;
      const params = [
        title,
        contents,
        price,
        image,
        currentDate,
        req.params.id,
      ];
      Query(connection, query, params).then((result: any) => {
        logging.info(
          NAMESPACE,
          `[updatePost-success] [postId:${req.params.id}]`
        );
        res.status(200).json({
          message: "Post updated",
          result,
        });
      });
    })
    .catch((error) => {
      logging.error(NAMESPACE, `[updatePost-Connect] ${error.message}`);
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};
const deletePost = (req: Request, res: Response, next: NextFunction) => {
  Connect()
    .then((connection: any) => {
      const query = `DELETE FROM posts WHERE id = ?`;
      const params = [req.params.id];
      Query(connection, query, params)
        .then((result: any) => {
          logging.info(
            NAMESPACE,
            `[deletePost-success] [postId:${req.params.id}]`
          );
          res.sendStatus(204);
        })
        .catch((error) => {
          logging.error(NAMESPACE, `[deletePost-Query] ${error.message}`);
          res.status(500).json({
            message: error.message,
            error,
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, `[deletePost-Connect] ${error.message}`);
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default {
  allPosts,
  getPost,
  writePost,
  updatePost,
  deletePost,
};
