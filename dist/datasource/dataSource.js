"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const movie_entitiy_1 = __importDefault(require("../features/movies/movie.entitiy")); // <-- FIXED: default import
const User_entity_1 = require("../features/auth/User.entity");
const dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Diior7920",
    database: "movies",
    synchronize: true,
    logging: true,
    entities: [movie_entitiy_1.default, User_entity_1.User]
});
exports.default = dataSource;
