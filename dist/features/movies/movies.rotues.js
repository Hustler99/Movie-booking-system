"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const movieValidator_1 = __importDefault(require("./movieValidator"));
const movie_service_1 = require("./movie.service");
const verifyToken_1 = require("../../middlewares/verifyToken");
const router = express_1.default.Router();
router.get("/", verifyToken_1.verifyTokenAdmin, (0, express_async_handler_1.default)(async (req, res) => {
    let allMovies = await (0, movie_service_1.getAllMovies)();
    res.status(200).json(allMovies);
}));
router.get("/:id", (0, express_async_handler_1.default)(async (req, res) => {
    let Movie = await (0, movie_service_1.findMovieById)(parseInt(req.params.id));
    if (Movie) {
        return res.status(200).json(Movie);
    }
    return res
        .status(404)
        .json({ message: `Movie with ID ${req.params.id} not found` });
}));
router.post("/", (0, express_async_handler_1.default)(async (req, res) => {
    const { error } = (0, movieValidator_1.default)(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { title, description, duration, releaseDate } = req.body;
    let result = await (0, movie_service_1.createMovie)(title, description, duration, releaseDate);
    res.status(201).json(result);
}));
router.put("/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const { error } = (0, movieValidator_1.default)(req.body, false);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { title, description, duration, releaseDate } = req.body;
    let updatedBook = await (0, movie_service_1.updatedMovie)(parseInt(req.params.id), title, description, duration, releaseDate);
    if (updatedBook) {
        return res.status(200).json(updatedBook);
    }
    return res.status(404).json({ message: `Movie with ID ${req.params.id} not found` });
}));
router.delete("/:id", (0, express_async_handler_1.default)(async (req, res) => {
    let result = await (0, movie_service_1.deleteMovie)(parseInt(req.params.id));
    if (result?.affected) {
        return res.status(200).json({ message: "Movie deleted successfully" });
    }
    return res
        .status(404)
        .json({ message: `Movie with ID ${req.params.id} not found` });
}));
exports.default = router;
