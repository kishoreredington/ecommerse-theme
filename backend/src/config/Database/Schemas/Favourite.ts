import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  type Relation,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User.js";
import { Product } from "./Product.js";

@Entity("favourites")
export class Favourite {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.favourites, { onDelete: "CASCADE" })
  user!: Relation<User>;

  @ManyToOne(() => Product, (product) => product.favourites, {
    onDelete: "CASCADE",
  })
  product!: Relation<Product>;

  @CreateDateColumn()
  createdAt!: Date;
}
