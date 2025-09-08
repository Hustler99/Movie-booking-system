"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authValidator_1 = require("./authValidator");
const auth_service_1 = require("./auth.service");
const token_util_1 = __importDefault(require("./token.util"));
const auth_util_1 = require("./auth.util");
const router = express_1.default.Router();
router.post("/register", (0, express_async_handler_1.default)(async (req, res) => {
    const { error } = (0, authValidator_1.validateUserSign)(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    let user = await (0, auth_service_1.isUserExist)(req.body.email);
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const { email, firstName, lastName, password } = req.body;
    let result = await (0, auth_service_1.createUser)(email, firstName, lastName, password);
    const { Password, ...other } = result;
    const token = (0, token_util_1.default)(result.id, result.email, Boolean(result.isAdmin));
    return res.status(201).json({ ...other, token });
}));
router.post("/login", (0, express_async_handler_1.default)(async (req, res) => {
    const { error } = (0, authValidator_1.validateLogin)(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    let user = await (0, auth_service_1.isUserExist)(req.body.email);
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPassMatched = await (0, auth_util_1.comparePassword)(req.body.password, user.Password);
    if (!isPassMatched) {
        return res.status(400).json({ message: "Invalid Email or Password" });
    }
    const token = (0, token_util_1.default)(user.id, user.email, Boolean(user.isAdmin));
    const { Password, ...other } = user;
    return res.status(200).json({ ...other, token });
}));
exports.default = router;
