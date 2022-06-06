import http from "http";
import app from "./app";
import logging from "./config/logging";
import config from "./config/config";

// create server
const server = http.createServer(app);

// server on
server.listen(config.server.port, () => {
  console.log(
    `Server is running [${config.server.host}:${config.server.port}]`
  );
});
