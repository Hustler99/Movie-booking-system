"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updatedMovie = exports.findMovieById = exports.createMovie = exports.getAllMovies = void 0;
const movie_entitiy_1 = __importDefault(require("./movie.entitiy"));
const dataSource_1 = __importDefault(require("../../datasource/dataSource"));
const movieRepo = dataSource_1.default.getRepository(movie_entitiy_1.default);
const getAllMovies = async () => {
    const getAll = await movieRepo.find();
    return getAll;
};
exports.getAllMovies = getAllMovies;
const createMovie = async (title, description, duration, releaseDate) => {
    let movie = new movie_entitiy_1.default();
    movie.title = title;
    movie.description = description;
    movie.duration = duration;
    movie.releaseDate = releaseDate;
    const saveMovie = await movieRepo.save(movie);
    return saveMovie;
};
exports.createMovie = createMovie;
const findMovieById = async (id) => {
    let movie = await movieRepo.findOneBy({ id });
    return movie;
};
exports.findMovieById = findMovieById;
const updatedMovie = async (id, title, description, duration, releaseDate) => {
    const movie = await (0, exports.findMovieById)(id);
    if (!movie)
        return null;
    movie.title = title !== undefined ? title : movie.title;
    movie.description =
        description !== undefined ? description : movie.description;
    movie.duration = duration !== undefined ? duration : movie.duration;
    movie.releaseDate =
        releaseDate !== undefined ? releaseDate : movie.releaseDate;
    const updatedMovie = await movieRepo.save(movie);
    console.log(updatedMovie);
    return updatedMovie;
};
exports.updatedMovie = updatedMovie;
const deleteMovie = async (id) => {
    const deleted = await movieRepo.delete(id);
    return deleted;
};
exports.deleteMovie = deleteMovie;
