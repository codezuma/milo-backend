"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const User_1 = require("./pg/User");
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
/* const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER,
  password: String(process.env.PG_PASSWORD),
  database: process.env.PG_DATABASE,
});
 
pool.on('error', function (err) {
  console.error('Database error!', err);
}); */
/* const pool = new Pool({connectionString:"postgresql://postgres:password@localhost:5432/milo"});
 */ /* console.log(`postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`); */
const client = new mongodb_1.MongoClient(process.env.MONGOCONNECT_URI || '');
client.connect();
console.info('connected');
client.db('milo').collection('users').find({ email: 'patidarchandresh@gmail.com' }).limit(1);
exports.user = new User_1.User(client); // strongly-typed