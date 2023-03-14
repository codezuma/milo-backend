import { DatabaseError, Pool, QueryResult } from "pg";
import { UserDto } from "../model/UserDto";
import { UserDb } from "../UserDb";

export class User {
    #pool: Pool; // connection pool

    constructor(pool: Pool) {
        this.#pool = pool;
    }

    async findByEmail({ email }: { email: string}): Promise<UserDto[]> {
        const client = await this.#pool.connect();
        this.#pool.connect().catch(err=>console.error(err));

        const  res:QueryResult = await client.query(`SELECT user_id FROM users WHERE email= '${email}'`);
         return User.mapUserResult(res);
    }


    private static mapUserResult = (
        res: QueryResult
      ): UserDto[] => // projection
        res.rows.map((r) => ({
          userId: r.user_id,
          firstName: r.firstName,
          lastName:  r.lastName,
          email: r.email,
          password:r.password,
          createdAt: r.created_at
        }));}