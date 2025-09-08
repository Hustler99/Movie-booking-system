import express, { Express, Router, Response, Request } from "express";
import AsyncHandler from "express-async-handler";
import { getShowTimeForMovie } from "../showtimes/showtime.service";
import { isUserExist } from "../auth/auth.service";
import { BookTicket, cancelBooking, getBookingbyId } from "./user.service";
import nodemailer from "nodemailer";
import { sendEmailAsync } from "./email.util";
import {
  bookingCancellationTemplate,
  bookingConfirmationTemplate,
} from "./emailTemplates";
import { showTime } from "./../showtimes/showtime.entity";

export const createBookingHanlder = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const isShowTimeValid = await getShowTimeForMovie(
      parseInt(req.params.showtimeId)
    );
    if (!isShowTimeValid) {
      return res.status(404).json({ message: "Show does not exists." });
    }

    const isUserExists = await isUserExist(req.user.email);
    if (!isUserExists) {
      return res.status(404).json({ message: "User does not exists." });
    }
    const result = await BookTicket(isUserExists, isShowTimeValid);
    if (result) {
      res.status(201).json(result);
      sendEmailAsync(
        result.user.email,
        "Booking Confirmed",
        bookingConfirmationTemplate(result)
      );
      return;
    }
    return res.status(404).json({
      message:
        "Sorry! theres no chair available try to reserve in another showtime.",
    });
  }
);

export const deleteBookingHandler = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const bookingID = await getBookingbyId(parseInt(req.params.bookingId));
    if (!bookingID) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    if (req.user.id === bookingID.user.id) {
      const result = await cancelBooking(parseInt(bookingID.id));

      res.status(201).json({ message: "Book Canceled" });
      sendEmailAsync(
        bookingID.user.email,
        "Booking Cancel",
        bookingCancellationTemplate(result)
      );
      return;
    }

    return res.status(404).json({ message: "Booking is not yours!" });
  }
);
