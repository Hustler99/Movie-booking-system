import express, { Express, Router, Response, Request } from "express";
import {
  verifyToken,
  verifyTokenAdmin,
} from "../../middlewares/verifyToken";
import {
  createMovieHandler,
  deleteMovieHandler,
  GetAllMoviesHandler,
  getMovieByIdHandler,
  updateMovieHanlder,
} from "./movie.controller";
const router = express.Router();

router
  .route("/")
  .get(verifyToken, GetAllMoviesHandler)
  .post(verifyTokenAdmin, createMovieHandler);
router
  .route("/:id")
  .get(verifyToken, getMovieByIdHandler)
  .put(verifyTokenAdmin, updateMovieHanlder)
  .delete(verifyTokenAdmin, deleteMovieHandler);

export default router;
