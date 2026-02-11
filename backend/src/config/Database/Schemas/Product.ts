import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

import { ProductVariant } from "./Product_varient.js";
import { type Relation } from "typeorm";
import { Favourite } from "./Favourite.js";

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
  productImage!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => Favourite, (fav) => fav.product)
  favourites!: Relation<Favourite[]>;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants!: Relation<ProductVariant[]>;

  @Column({ default: "" })
  about!: string;

  @Column({ default: "" })
  family!: string;

  @Column({ default: "" })
  gender!: string;

  @Column({ default: "" })
  topNotes!: string;

  @Column({ default: "" })
  heartNotes!: string;

  @Column({ default: "" })
  baseNotes!: string;

  @Column({ default: "" })
  longevity!: string;

  @Column({ default: "" })
  sillage!: string;
}
