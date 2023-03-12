"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (err) {
        return res.status(400).json(err.errors);
    }
};
exports.default = validate;
