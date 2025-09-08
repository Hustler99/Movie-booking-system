"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserSign = validateUserSign;
exports.validateLogin = validateLogin;
const joi_1 = __importDefault(require("joi"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
function validateUserSign(obj) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().trim().required().max(100),
        firstName: joi_1.default.string().trim().min(3).max(100).required(),
        lastName: joi_1.default.string().trim().min(3).max(100).required(),
        password: (0, joi_password_complexity_1.default)().required(),
    });
    return schema.validate(obj);
}
function validateLogin(obj) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().trim().required().max(100),
        password: (0, joi_password_complexity_1.default)().required(),
    });
    return schema.validate(obj);
}
