import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Order } from "./Orders.js";

import { ProductVariant } from "./Product_varient.js";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "order_id" })
  order!: Order;

  @ManyToOne(() => ProductVariant)
  @JoinColumn({ name: "variant_id" })
  variant!: ProductVariant;

  @Column()
  quantity!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number; // price at time of purchase
}
