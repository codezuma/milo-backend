import mongoose from 'mongoose';
import config from '@config/index';

export default async (): Promise<mongoose.mongo.Db> => {
  const connection = await mongoose.connect(config.databaseURL||'', {  });
  return connection.connection.db;
};
