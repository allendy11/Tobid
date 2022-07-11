import dotenv from "dotenv";

dotenv.config();

// server
const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || "8080";
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "tobid";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "tobidsecret";
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || "10m";
const SERVER_HASH_SALT = process.env.SERVER_HASH_SALT || 10;

const server = {
  host: SERVER_HOST,
  port: SERVER_PORT,
  token: {
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
    expireTime: SERVER_TOKEN_EXPIRETIME,
  },
  hash: {
    salt: SERVER_HASH_SALT,
  },
};

// mysql
const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "password";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "tobid";
const MYSQL_PORT = process.env.MYSQL_PORT || "3306";

const mysql = {
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: Number(MYSQL_PORT),
};

// RDS
// const RDS_HOST = process.env.RDS_HOST;
// const RDS_USER = process.env.RDS_USER;
// const RDS_PASSWORD = process.env.RDS_PASSWORD;
// const RDS_DATABASE = process.env.RDS_DATABASE;
// const RDS_PORT = process.env.RDS_PORT;

// const mysql = {
//   host: RDS_HOST,
//   user: RDS_USER,
//   password: RDS_PASSWORD,
//   database: RDS_DATABASE,
//   port: Number(RDS_PORT),
// };

export default {
  server,
  mysql,
};
