import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import Movie from "../movies/movie.entitiy";
import { showTime } from "../showtimes/showtime.entity";
import { User } from "../auth/User.entity";

@Entity({ name: "bookings" })
export class booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, (movie) => movie.booking)
  movie: Movie;

  @ManyToOne(() => showTime, (showTime) => showTime.booking)
  showtime: showTime;

  @ManyToOne(() => User, (user) => user.booking)
  user: User;

  @Column({ type: "time with time zone" })
  time: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time with time zone" })
  createdAt: string;
}
