import express, { Express, Router, Response, Request } from "express";
import AsyncHandler from "express-async-handler";
import { createShowTime, getAllShowTimeForMovie, getAllShowTimes } from "./showtime.service";
import { findMovieById } from "../movies/movie.service";

export const getShowTimeHanlder =   AsyncHandler(async (req: Request, res: Response) => {
    const showTime = await getAllShowTimes();
    showTime.length>0? res.status(200).json(showTime): res.status(404).json({ message: "Not Found" });
  })

  export const getAllShowTimeToMovieHanlder =   AsyncHandler(async (req: Request, res: Response) => {
    const showTime = await getAllShowTimeForMovie(parseInt(req.params.id));
    showTime.length>0? res.status(200).json(showTime): res.status(404).json({ message: "Not Found" });
  })


  export const createShowTimeHandler =   AsyncHandler(async (req: Request, res: Response): Promise<any> => {
      const movie = await findMovieById(parseInt(req.params.id));
  
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      const {date,showTime,availableSeats,totalSeats}= req.body
      let result = await createShowTime(date,showTime,availableSeats,totalSeats,movie);
  
      res.status(201).json(result);
    })