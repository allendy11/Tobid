import dotenv from "dotenv";

dotenv.config();

// server
const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || "4000";
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
const MYSQL_USER = process.env.MYSQL_USER || "localhost";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "localhost";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "localhost";

const mysql = {
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
};

export default {
  server,
  mysql,
};
