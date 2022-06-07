import mysql from "mysql";
import config from "./config";

const development = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

export const Connect = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(development);

    connection.connect((error) => {
      if (error) {
        reject(error);
      } else {
        resolve(connection);
      }
    });
  });
};

export const Query = (
  connection: mysql.Connection,
  query: string,
  params?: string[]
) => {
  if (params) {
    return new Promise((resolve, reject) => {
      connection.query(query, params, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          connection.end();
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      connection.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          connection.end();
        }
      });
    });
  }
};
