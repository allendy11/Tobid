import dotenv from "dotenv";

dotenv.config();

// server
const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || "4000";
const server = {
  host: SERVER_HOST,
  port: SERVER_PORT,
};

// mysql
const mysql = {};

export default {
  server,
  mysql,
};
