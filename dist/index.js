"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const route = require('./routes/index');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ type: "*/*" }));
app.get('/', (req, res) => {
    res.send('Server is running👍');
    res.status;
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
app.use('/api', require('./routes/index'));
app.get('*', (req, res) => {
    res.status(404);
    res.send('Bad request ❌');
    res.end();
});
