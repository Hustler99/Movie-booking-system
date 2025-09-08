import dataSource from "../../datasource/dataSource";
import { User } from "../auth/User.entity";
import { booking } from "../booking/book.entity";
import { showTime } from "../showtimes/showtime.entity";
import {
  decrementSeats,
  getShowTimeForMovie,
  incrementSeats,
} from "../showtimes/showtime.service";
import { getEgyptTime } from "./time.util";

const bookingRepo = dataSource.getRepository(booking);

export async function getBookingbyId(id: number): Promise<any> {
  const myBook = await bookingRepo.findOne({
    where: { id: id },
    relations: ["showtime", "user"],
  });
  return myBook;
}

export async function browseShowTimes(id: number) {
  let showTime = await getShowTimeForMovie(id);
  return showTime;
}

export async function BookTicket(user: User, show: showTime) {
  const bookObj = new booking();

  const isChairAvailable = await decrementSeats(show.id);
  if (isChairAvailable) {
    bookObj.createdAt = getEgyptTime();
    bookObj.movie = show.movie;
    (bookObj.showtime = show), (bookObj.user = user);
    bookObj.time = show.showTime;
    bookObj.date = show.date;

    const result = await bookingRepo.save(bookObj);
    return result;
  }

  return null;
}

export async function cancelBooking(bookingId: number) {
  const myBooking = await getBookingbyId(bookingId);

  if (!myBooking) {
    return null;
  }
  await decrementSeats(myBooking.showtime.id);
  const result = await bookingRepo.remove(myBooking);
  return result;
}
