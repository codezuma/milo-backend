import config from "@config/index";
import session, { Store } from "express-session";
import { Connection } from "mongoose";
import { Application } from "express";
import MongoStore from 'connect-mongo';

export default (app: Application, connection: Connection): void => {
  const SECONDS_IN_DAY = 1000 * 60 * 60 * 24;

  const sessionMiddleware = session({
    secret: config.sessionStorageSecret || "",
    resave: false,
    store: MongoStore.create({
        dbName: 'myapp',
        collectionName: 'sessions',
        client:connection.getClient()
      }),
    saveUninitialized: true,
    cookie: {
      maxAge: SECONDS_IN_DAY,
    },
  });
   
  app.use(sessionMiddleware);
};
