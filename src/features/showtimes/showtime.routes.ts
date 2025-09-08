import express, { Express, Router, Response, Request } from "express";
import {
  createShowTimeHandler,
  getAllShowTimeToMovieHanlder,
  getShowTimeHanlder,
} from "./showtime.controller";
import { verifyToken, verifyTokenAdmin } from "../../middlewares/verifyToken";

const router = express();

router.get("/", verifyToken, getShowTimeHanlder);

router.post("/movie/:id", verifyTokenAdmin, createShowTimeHandler);
router.get("/movie/:id", verifyToken, getAllShowTimeToMovieHanlder);


export default router;
 