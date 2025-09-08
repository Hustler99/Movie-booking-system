"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = ((req, res, next) => {
    console.log(`${req.method}, ${req.protocol} , ${req.originalUrl}`);
    next();
});
exports.default = logger;
