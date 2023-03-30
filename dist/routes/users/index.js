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
const validator_1 = __importDefault(require("../../validator"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({ message: "working" });
});
const createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email("email not valid"),
    password: zod_1.z.string().min(8, { message: 'Minimum length is 8' })
});
router.post('/', (0, validator_1.default)(createUserSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('create user hitted');
        const users = yield db_1.user.addUser(req.body);
        if (!(users.acknowledged)) {
            console.log('users', users);
            res.status(422);
            res.json({ message: 'Error occured',
                email: req.body.email });
        }
        else {
            res.status(201);
            res.json({ message: 'user Created',
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
