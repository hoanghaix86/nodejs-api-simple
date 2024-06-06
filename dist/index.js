"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/ping', (req, res, next) => {
    res.status(200).send("ok");
});
app.all('*', (req, res, next) => {
    res.status(404).send("Not Found");
});
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
