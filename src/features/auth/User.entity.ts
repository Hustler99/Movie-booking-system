import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { booking } from "../booking/book.entity";

@Entity({ name: "Users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  lastName: string;

  @Column({ type: "boolean", default: false, nullable: true })
  isAdmin: string;
  
  @Column({ type: "varchar", length: 255, nullable: false })
  Password: string;

    @OneToMany( ()=> booking, (booking)=>booking.movie)
    booking:  booking[];
}
