import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { showTime } from "../showtimes/showtime.entity";
import { booking } from "../booking/book.entity";

@Entity({ name: "Movies" })
export default class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  title!: string;

  @Column({ type: "varchar", length: 300, nullable: false })
  description!: string;

  @Column({ type: "int", nullable: false })
  duration!: number;

  @Column({ type: "timestamp", nullable: false })
  releaseDate: Date; 

  @OneToMany(()=>showTime , (showtime)=>showtime.movie , {cascade:true})

  showtimes:showTime[];

  @OneToMany( ()=> booking, (booking)=>booking.movie)
  booking:  booking[];
}


