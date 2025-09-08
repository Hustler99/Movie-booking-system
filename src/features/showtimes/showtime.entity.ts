import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
} from "typeorm";
import Movie from "../movies/movie.entitiy";
import { booking } from "../booking/book.entity";

@Entity({ name: "Showtimes" })
export class showTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: false })
  date: string;

  @Column({ type: "time with time zone", nullable: false })
  showTime: string;

  @Column({ type: "int", nullable: false })
  availableSeats: number;

  @Column({ type: "int", nullable: false })
  totalSeats: number;

  @ManyToOne(() => Movie, (movie) => movie.showtimes)
  movie: Movie;

  @OneToMany(() => booking, (booking) => booking.showtime)
  booking: booking[];
}
