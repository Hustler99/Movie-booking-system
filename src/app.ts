import express, { Request, Response } from "express";
import dotenv from "dotenv";
import logger from "./middlewares/logger";
import moviesRouter from "./features/movies/movies.routes";
import AuthRouter from "./features/auth/auth.routes";
import showTimeRouter from "./features/showtimes/showtime.routes"
import userRoute from "./features/user/user.routes"
import dataSource from "./datasource/dataSource";
import "reflect-metadata";
dotenv.config();


const app = express();





//*Middlewares
app.use(express.json())
app.use(logger);

//*Routres
app.use("/api/movies", moviesRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/showtimes", showTimeRouter);
app.use("/api/booking", userRoute);




dataSource.initialize()
  .then(() => {
    console.log("DataSource successfully connected with DB");
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is running on port ${process.env.PORT}, on link http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("DataSource connection failed");
    console.error(err);
  });
