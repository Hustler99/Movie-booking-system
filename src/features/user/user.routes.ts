import express, { Express, Router, Response, Request } from "express";
import { verifyToken, verifyTokenAndAuth } from "../../middlewares/verifyToken";
import { createBookingHanlder, deleteBookingHandler } from "./user.controller";

const router = express();


router.post("/:showtimeId", verifyToken, createBookingHanlder);

router.delete("/:bookingId", verifyToken, deleteBookingHandler);

export default router;


