import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Order } from "./Orders.js";
import { type Relation } from "typeorm";

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.payment)
  @JoinColumn({ name: "order_id" })
  order!: Relation<Order>;

  @Column()
  provider!: string; // Razorpay, Stripe

  @Column()
  transactionId!: string;

  @Column({
    type: "enum",
    enum: PaymentStatus,
  })
  status!: PaymentStatus;

  @CreateDateColumn()
  createdAt!: Date;
}
