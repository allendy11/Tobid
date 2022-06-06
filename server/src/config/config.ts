import dotenv from "dotenv";

dotenv.config();

// server
const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || "4000";
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "tobid";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "tobidsecret";
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || "10m";

const server = {
  host: SERVER_HOST,
  port: SERVER_PORT,
  token: {
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
    expireTime: SERVER_TOKEN_EXPIRETIME,
  },
};

// mysql
const mysql = {};

export default {
  server,
  mysql,
};
