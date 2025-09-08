import Movie from "./movie.entitiy";
import dataSource from "../../datasource/dataSource";
const movieRepo = dataSource.getRepository(Movie);

export const getAllMovies = async () => {
  const getAll = await movieRepo.find();
  return getAll;
};

export const createMovie = async (
  title: string,
  description: string,
  duration: number,
  releaseDate: Date
) => {
  let movie = new Movie();

  movie.title = title;
  movie.description = description;
  movie.duration = duration;
  movie.releaseDate = releaseDate;
  const saveMovie = await movieRepo.save(movie);
  return saveMovie;
};

export const findMovieById = async (id: number) => {
  let movie = await movieRepo.findOneBy({ id });
  return movie;
};

export const updatedMovie = async (
  id: number,
  title?: string,
  description?: string,
  duration?: number,
  releaseDate?: Date
) => {
  const movie = await findMovieById(id);
  if (!movie) return null;

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

export const deleteMovie = async (id: number) => {
  const deleted = await movieRepo.delete(id);
  return deleted;
};
