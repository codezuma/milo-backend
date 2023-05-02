import config from "./config";

import express from "express";
import 'module-alias/register';

async function startServer() {
  const app = express();


  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await require("./loaders/").default({ expressApp: app });

  app
    .listen(config.port, () => {
      console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on("error", err => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
