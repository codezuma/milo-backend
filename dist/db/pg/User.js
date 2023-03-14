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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _User_pool;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(pool) {
        _User_pool.set(this, void 0); // connection pool
        __classPrivateFieldSet(this, _User_pool, pool, "f");
    }
    findByEmail({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield __classPrivateFieldGet(this, _User_pool, "f").connect();
            __classPrivateFieldGet(this, _User_pool, "f").connect().catch(err => console.error(err));
            const res = yield client.query(`SELECT user_id FROM users WHERE email= '${email}'`);
            return User.mapUserResult(res);
        });
    }
}
exports.User = User;
_User_pool = new WeakMap();
User.mapUserResult = (res) => // projection
 res.rows.map((r) => ({
    userId: r.user_id,
    firstName: r.firstName,
    lastName: r.lastName,
    email: r.email,
    password: r.password,
    createdAt: r.created_at
}));
