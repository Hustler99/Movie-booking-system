"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
exports.verifyTokenAndAuth = verifyTokenAndAuth;
exports.verifyTokenAdmin = verifyTokenAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    // Accept either "Authorization: Bearer ..." or "token: ..."
    let authHeader = req.headers["authorization"] || req.headers["token"];
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }
    // Handle "Bearer <token>"
    const token = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}
function verifyTokenAndAuth(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === parseInt(req.params.id) || req.user.isAdmin) {
            next();
        }
        else {
            return res
                .status(403)
                .json({ message: "You are not allowed [ Forbidden ]." });
        }
    });
}
function verifyTokenAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            return res
                .status(403)
                .json({ message: "you are not allowed, only admin allowed" });
        }
    });
}
