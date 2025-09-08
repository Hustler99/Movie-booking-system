"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.isUserExist = void 0;
const dataSource_1 = __importDefault(require("../../datasource/dataSource"));
const User_entity_1 = require("./User.entity");
const auth_util_1 = require("./auth.util");
const userRepo = dataSource_1.default.getRepository(User_entity_1.User);
const isUserExist = async (email) => {
    let result = userRepo.findOneBy({ email });
    return result;
};
exports.isUserExist = isUserExist;
const createUser = async (email, firstName, lastName, password) => {
    let user = new User_entity_1.User();
    password = await (0, auth_util_1.hashPassword)(password);
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.Password = password;
    const result = userRepo.save(user);
    return result;
};
exports.createUser = createUser;
