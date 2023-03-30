"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(client) {
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
    findUser({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this._client.connect();
            const res = yield client.db('milo').collection('users').countDocuments({ email: email });
            yield client.close();
            return res;
        });
    }
    addUser({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this._client.connect();
            console.log('email and password recieved', email, password);
            const res = yield client.db('milo').collection('users').insertOne({ email: email, password: password });
            yield client.close();
            console.log('response for adding user');
            return res;
        });
    }
}
exports.User = User;
User.mapUserResult = (res) => // projection
 res.rows.map((r) => ({
    userId: r.user_id,
    firstName: r.firstName,
    lastName: r.lastName,
    email: r.email,
    password: r.password,
    createdAt: r.created_at
}));
