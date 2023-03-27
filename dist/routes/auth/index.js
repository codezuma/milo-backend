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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const db_1 = require("../../db");
const router = express_1.default.Router();
const emailValidateSchema = zod_1.z.object({
    email: zod_1.z.string().email("email not valid")
});
router.get('/login/email-validate/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.email)
            res.status(400).json(({ message: 'Email is empty' }));
        const filter = { email: String(req.query.email) };
        const users = yield db_1.user.findUser(filter);
        if (!(users === 0)) {
            console.log('users', users);
            res.status(422);
            res.json({ message: 'Email already exists',
                email: req.body.email });
        }
        else {
            res.status(200);
            res.json({ message: 'Email Does not exist',
                email: req.body.email });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500);
        res.json({ message: 'Server Error',
            error: err,
            email: req.body.email });
    }
}));
module.exports = router;
