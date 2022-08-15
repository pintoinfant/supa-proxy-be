import * as dotenv from "dotenv";
dotenv.config();

import server from "./api";
import { redisClient } from "./helpers/client";

redisClient.connect();

server.listen(process.env.API_PORT || 5000, () => {
  console.log(
    `The API server has successfully started. \nListening at ${
      process.env.APP_BASE_URL || "http://localhost:5000"
    }`
  );
});

process.on("SIGINT", function () {
  redisClient.disconnect();
  process.exit(0);
});
