import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { Product } from "./Product.js";
import { type Relation } from "typeorm";
import { Favourite } from "./Favourite.js";

@Entity("product_variants")
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: "CASCADE",
  })
  product!: Relation<Product>;

  @Column()
  size!: string;

  @Column("decimal", {
    precision: 10,
    scale: 2,
  })
  price!: number;

  @OneToMany(() => Favourite, (fav) => fav.product)
  favourites!: Relation<Favourite[]>;

  @Column()
  stock!: number;

  @Column({ default: false })
  isDefault!: boolean;
}
