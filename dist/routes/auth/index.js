"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const validator_1 = __importDefault(require("../../validator"));
const router = express_1.default.Router();
const emailValidateSchema = zod_1.z.object({
    email: zod_1.z.string().email("email not valid")
});
router.post('/login/email-validate/', (0, validator_1.default)(emailValidateSchema), (req, res) => {
    res.json({ message: "working" });
});
module.exports = router;
