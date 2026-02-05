import bcrypt from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { type Relation } from "typeorm";

import { Address } from "./Adress.js";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Relation<Address[]>;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password.startsWith("$2")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
