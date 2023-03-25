import { InsertOneResult, MongoClient, WithId } from "mongodb";
import { DatabaseError, Pool, QueryResult } from "pg";
import { UserDto } from "../model/UserDto";
import { UserDb } from "../UserDb";

export class User implements UserDb {
  _client: MongoClient; // connection pool

  constructor(client: MongoClient) {
    this._client = client;
  }
  /* 
      async findByEmail({ email }: { email: string}): Promise<UserDto[]> {
          const client = await this._client.connect();
          this._client.connect().catch(err=>console.error(err));
  
          const  res:QueryResult = await client.query(`SELECT user_id FROM users WHERE email= '${email}'`);
           return User.mapUserResult(res);
      }
   */
  async findUser({ email }: { email: string }) {
    console.log('before db ');
    const client = await (await this._client.connect()).addListener('error',(err:Error)=>console.error(err));
    console.log('after db ',client);
    const res: number = await client.db('milo').collection('users').countDocuments({ email: email });
    await client.close();
    console.log('response for adding user', res);
    return res;
  }

  async addUser({ email, password }: { email: string, password: string }) {
    const client = await this._client.connect();
    console.log('email and password recieved',email,password);
    const res: InsertOneResult = await client.db('milo').collection('users').insertOne({ email: email, password: password });
    await client.close();
    console.log('response for adding user');
    return res;
  }


  private static mapUserResult = (
    res: QueryResult
  ): UserDto[] => // projection
    res.rows.map((r) => ({
      userId: r.user_id,
      firstName: r.firstName,
      lastName: r.lastName,
      email: r.email,
      password: r.password,
      createdAt: r.created_at
    }));
}