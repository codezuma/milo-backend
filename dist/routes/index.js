"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('api working 🚀');
});
//setting all routes for app
router.use('/users/', require("./users/"));
router.use('/auth/', require("./auth/"));
module.exports = router;
