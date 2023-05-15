import mongoose from "mongoose";
import config from "@config/index";

 const moongoseDB = async (): Promise<mongoose.Connection> => {
  const connection = await mongoose.connect(config.databaseURL || "",{authSource:'admin'});
  const buzzlyticsDB = connection.connection.useDb("buzzlytics");
  console.log('db name',buzzlyticsDB.db.databaseName);
  return buzzlyticsDB;
};

export default moongoseDB;