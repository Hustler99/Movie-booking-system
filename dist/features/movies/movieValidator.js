"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function validateMovie(obj, isCreate = true) {
    const schema = joi_1.default.object({
        title: joi_1.default.string()
            .trim()
            .min(2)
            .max(100)
            .when("$isCreate", { is: true, then: joi_1.default.required() }),
        description: joi_1.default.string()
            .trim()
            .min(10)
            .max(100)
            .when("$isCreate", { is: true, then: joi_1.default.required() }),
        duration: joi_1.default.number().when("$isCreate", {
            is: true,
            then: joi_1.default.required(),
        }),
        releaseDate: joi_1.default.date().when("$isCreate", {
            is: true,
            then: joi_1.default.required(),
        }),
    });
    return schema.validate(obj, { context: { isCreate } });
}
exports.default = validateMovie;
