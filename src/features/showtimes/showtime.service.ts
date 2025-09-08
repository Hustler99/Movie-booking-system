import dataSource from "../../datasource/dataSource";
import Movie from "../movies/movie.entitiy";
import { showTime } from "./showtime.entity";
const showTimeRepo = dataSource.getRepository(showTime);

export async function getAllShowTimes() {
  const result = await showTimeRepo.find({
    relations: ["movie"],
  });
  return result;
}

export async function getShowTimeForMovie(id: number) {
  const result = await showTimeRepo.findOne({
    where: { id },
    relations: ["movie"],
  });
  return result;
}

export async function getAllShowTimeForMovie(id: number) {
  const result = await showTimeRepo.find({
    where: {movie:{id}},
    relations: ["movie"],
  });
  return result;
}


export async function createShowTime(
  date: string,
  showtime: string,
  totalSeats: number,
  availableSeats: number,
  movie: Movie
) {
  const newShowTime = new showTime();
  newShowTime.date = date;
  newShowTime.showTime = showtime;
  newShowTime.totalSeats = totalSeats;
  newShowTime.availableSeats = availableSeats;
  newShowTime.movie = movie;

  const result = await showTimeRepo.save(newShowTime);
  return result;
}

export async function incrementSeats(showtimeId: number) {
  const show = await getShowTimeForMovie(showtimeId);
  if (!show) {
    return null;
  }
  show.availableSeats += 1;
  await showTimeRepo.save(show);
  return show;
}

export async function decrementSeats(showtimeId: number) {
  const show = await getShowTimeForMovie(showtimeId);
  if (!show) {
    return null;
  }
  if (show.availableSeats >= 1) {
    show.availableSeats -= 1;
    await showTimeRepo.save(show);
    return show;
  }
  return null;
}
