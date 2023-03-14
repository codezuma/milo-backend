import { Pool, types } from "pg";
import { User } from "./pg/User";
import { UserDb } from "./UserDb";
import dotenv from 'dotenv'
dotenv.config();
const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER,
  password: String(process.env.PG_PASSWORD),
  database: process.env.PG_DATABASE,
});
 
pool.on('error', function (err) {
  console.error('Database error!', err);
});
/* const pool = new Pool({connectionString:"postgresql://postgres:password@localhost:5432/milo"});
 *//* console.log(`postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`); */
 

export const user: UserDb = new User(pool); // strongly-typed