import { DataSource }   from "typeorm";
import Movie from "../features/movies/movie.entitiy"; // <-- FIXED: default import
import { User } from "../features/auth/User.entity";
import { showTime } from "../features/showtimes/showtime.entity";
import { booking } from "../features/booking/book.entity";


const dataSource = new DataSource({
    type :"postgres",
    host:"localhost",
    port: 5432,
    username:"postgres",
    password:"Diior7920",
    database:"movies",
    synchronize:true,
    logging:true,
    entities:[ Movie,User, showTime, booking ]

})

export default dataSource