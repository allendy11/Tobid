import mysql from "mysql";
import config from "./config";

const development = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

export const Connect = async () => {
  new Promise((resolve, reject) => {
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

export const Query = async (
  connection: mysql.Connection,
  query: string,
  params: []
) => {
  new Promise((resolve, reject) => {
    connection.query(query, params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
        connection.end();
      }
    });
  });
};
