import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

import { ProductVariant } from "./Product_varient.js";
import { type Relation } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  brand!: string;

  @Column("text")
  description!: string;

  @Column({ nullable: true })
  productImage!: string; // 👈 SINGLE IMAGE

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants!: Relation<ProductVariant[]>;
}
