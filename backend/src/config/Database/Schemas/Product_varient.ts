import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Product } from "./Product.js";
import { type Relation } from "typeorm";

@Entity("product_variants")
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: "CASCADE",
  })
  product!: Relation<Product>;

  @Column()
  size!: string; // 50ml, 100ml

  @Column("decimal", {
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column()
  stock!: number;

  @Column({ default: false })
  isDefault!: boolean; // 👈 default size
}
