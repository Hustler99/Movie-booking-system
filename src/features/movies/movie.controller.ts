import express, { Express, Router, Response, Request } from "express";
import AsyncHandler from "express-async-handler";
import {
  createMovie,
  deleteMovie,
  findMovieById,
  getAllMovies,
  updatedMovie,
} from "./movie.service";
import validateMovie from "./movieValidator";

export const GetAllMoviesHandler  = AsyncHandler(
  async (req: Request, res: Response) :Promise<any> => {
    
    let allMovies = await getAllMovies();
    if (!allMovies.length) {
     return res.status(404).json({ message: "No movies found" });
}
   return  res.status(200).json(allMovies);
  }
);

export const getMovieByIdHandler = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    let Movie = await findMovieById(parseInt(req.params.id));
    if (Movie) {
      return res.status(200).json(Movie);
    }
    return res
      .status(404)
      .json({ message: `Movie with ID ${req.params.id} not found` });
  }
);

export const createMovieHandler = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { error } = validateMovie(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { title, description, duration, releaseDate } = req.body;

    let result = await createMovie(title, description, duration, releaseDate);
   return res.status(201).json(result);
  }
);

export const updateMovieHanlder = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { error } = validateMovie(req.body, false);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { title, description, duration, releaseDate } = req.body;
    let updatedBook = await updatedMovie(
      parseInt(req.params.id),
      title,
      description,
      duration,
      releaseDate
    );

    if (updatedBook) {
      return res.status(200).json(updatedBook);
    }
    return res
      .status(404)
      .json({ message: `Movie with ID ${req.params.id} not found` });
  }
);

export const deleteMovieHandler = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    let result = await deleteMovie(parseInt(req.params.id));
    if (result?.affected) {
      return res.status(200).json({ message: "Movie deleted successfully" });
    }
    return res
      .status(404)
      .json({ message: `Movie with ID ${req.params.id} not found` });
  }
);
