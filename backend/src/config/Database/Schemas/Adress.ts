import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { type Relation } from "typeorm";
import { User } from "./User.js";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: "user_id" })
  user!: Relation<User>;

  @Column()
  line1!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  pincode!: string;

  @Column()
  country!: string;
}
