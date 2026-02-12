import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { User } from "./User.js";
import { ProductVariant } from "./Product_varient.js";

@Entity("add_to_cart")
export class AddToCart {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.addToCart)
  @JoinColumn({ name: "userId" })
  user!: Relation<User>;

  @ManyToOne(() => ProductVariant, (variant) => variant.addToCart)
  @JoinColumn({ name: "variantId" })
  variant!: Relation<ProductVariant>;

  @Column({ default: 0 })
  quantity!: number;
}
