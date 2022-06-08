import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";
import IUser from "../interface/user";

const NAMESPACE = "Test";

const test = (req: Request, res: Response, next: NextFunction) => {
  const { username, email } = req.body;
  Connect().then((connection: any) => {
    const query = `SELECT * FROM users WHERE (username = ?)`;
    const params = [username];
    Query(connection, query, params).then((result: any) => {
      if (result.length) {
        res.json({
          message: "username conflict",
        });
      }
    });
  });
  Connect().then((connection: any) => {
    const query = `SELECT * FROM users WHERE (email = ?)`;
    const params = [email];
    Query(connection, query, params).then((result: any) => {
      if (result.length) {
        res.json({
          message: "email conflict",
        });
      }
    });
  });
};

export default test;
