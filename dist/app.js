"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const movies_rotues_1 = __importDefault(require("./features/movies/movies.rotues"));
const auth_rotues_1 = __importDefault(require("./features/auth/auth.rotues"));
const dataSource_1 = __importDefault(require("./datasource/dataSource"));
require("reflect-metadata");
dotenv_1.default.config();
const app = (0, express_1.default)();
//*Middlewares
app.use(express_1.default.json());
app.use(logger_1.default);
//*Routres
app.use("/api/movies", movies_rotues_1.default);
app.use("/api/auth", auth_rotues_1.default);
dataSource_1.default.initialize()
    .then(() => {
    console.log("DataSource successfully connected with DB");
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}, on link http://localhost:${process.env.PORT}`);
    });
})
    .catch((err) => {
    console.log("DataSource connection failed");
    console.error(err);
});
