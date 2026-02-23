import crypto from "crypto";
import { type Request, type Response } from "express";
import { PaymentGateway } from "../utils/PaymentGateway.js";
import { AppDataSource } from "../config/Database/DBconfig.js";
import { Order } from "../config/Database/Schemas/Orders.js";
import { OrderStatus } from "../config/Database/Schemas/Order_Status_History.js";
import { User } from "../config/Database/Schemas/User.js";
import { Payment, PaymentStatus } from "../config/Database/Schemas/Payment.js";
import { OrderItem } from "../config/Database/Schemas/Order_Items.js";
import { ProductVariant } from "../config/Database/Schemas/Product_varient.js";
import { Address } from "../config/Database/Schemas/Adress.js";
import puppeteer from "puppeteer";

export const createOrder = async (req: Request, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const paymentRepo = AppDataSource.getRepository(Payment);
  const userRepo = AppDataSource.getRepository(User);
  const orderItemRepo = AppDataSource.getRepository(OrderItem);
  const variantRepo = AppDataSource.getRepository(ProductVariant);
  const addressRepo = AppDataSource.getRepository(Address);

  try {
    const { addressId, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    let totalPrice = 0;

    for (const item of items) {
      const variant = await variantRepo.findOne({
        where: { id: item.variantId },
        relations: { product: true },
      });

      if (!variant) throw new Error("Variant not found");

      if (variant.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${variant.product.name}`);
      }

      totalPrice += Number(variant.price) * item.quantity;
    }

    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const user = await userRepo.findOne({
      where: { id: 1 },
      relations: {
        addresses: true,
      },
    });

    if (!user || user.addresses.length === 0) {
      throw new Error("User or address not found");
    }

    let address = await addressRepo.findOne({
      where: {
        id: addressId,
      },
    });

    if (!address) {
      throw new Error("Address not found for user");
    }

    let order = await orderRepo.findOne({
      where: {
        user: {
          id: user.id,
        },
        status: OrderStatus.PENDING,
      },
    });

    if (!order) {
      order = orderRepo.create({
        user: {
          id: user.id,
        },
        address: {
          id: Number(address.id),
        },
        status: OrderStatus.PENDING,
        totalAmount: Number(totalPrice),
      });

      await orderRepo.save(order);
    }

    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const variant = await variantRepo.findOne({
        where: { id: item.variantId },
      });

      if (!variant) {
        throw new Error("Variant not found");
      }

      const orderItem = orderItemRepo.create({
        order: { id: order.id }, // 👈 link order
        variant: { id: variant.id }, // 👈 link variant
        quantity: item.quantity,
        price: variant.price, // 👈 snapshot price
      });

      orderItems.push(orderItem);
    }

    await orderItemRepo.save(orderItems);

    const strapiOrder = await PaymentGateway.getInstance().createOrder(
      totalPrice,
      options.receipt,
    );

    const payment = paymentRepo.create({
      order,
      provider: "razerpay",
      transactionId: strapiOrder.id,
      status: PaymentStatus.PENDING,
    });

    paymentRepo.save(payment);

    return res.status(200).json({ strapiOrder, orderId: order.id });
  } catch (err) {
    return res.status(500).json({ message: "Order creation failed", err });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const isValid = PaymentGateway.getInstance().verifyPayment(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  );

  if (isValid) {
    try {
      const paymentRepo = AppDataSource.getRepository(Payment);
      const orderRepo = AppDataSource.getRepository(Order);

      const payment = await paymentRepo.findOne({
        where: {
          transactionId: razorpay_order_id,
        },
        relations: {
          order: true,
        },
      });

      if (!payment) {
        return res.status(404).json({ message: "Payment record not found" });
      }

      payment.status = PaymentStatus.SUCCESS;
      payment.transactionId = razorpay_payment_id;

      payment.order.status = OrderStatus.PAID;

      await paymentRepo.save(payment);
      await orderRepo.save(payment.order);

      return res.status(200).json({
        message: "Payment verified & order confirmed",
        orderId: payment.order.id,
      });
    } catch (error) {
      return res.status(400).json({ message: "verification failed" });
    }
  } else {
    return res.status(400).json({ message: "verification failed" });
  }
};

export const webhookPayment = async (req: Request, res: Response) => {
  try {
    const signature = req.headers["x-razorpay-signature"] as string;

    if (!signature) {
      return res.status(400).json({ message: "Missing signature" });
    }

    let rawBody: string;

    if (Buffer.isBuffer(req.body)) {
      console.log("BUFFER");
      rawBody = req.body.toString("utf8");
    } else if (typeof req.body === "string") {
      rawBody = req.body;
    } else {
      return res.status(400).json({ message: "Invalid request format" });
    }

    const body = JSON.parse(rawBody);

    const secrets = {
      WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,
      KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
      PASSWORD: process.env.WEBHOOK_TEST_SECRET,
    };

    let isValid = false;
    let workingSecret = null;

    for (const [name, secret] of Object.entries(secrets)) {
      if (!secret) {
        console.log(`❌ ${name}: Not found`);
        continue;
      }

      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(rawBody)
        .digest("hex");

      const matches = expectedSignature === signature;

      if (matches) {
        isValid = true;
        workingSecret = name;
        break;
      }
    }

    // Process the payment
    if (body.event === "payment.captured") {
      const razorpayOrderId = body.payload.payment.entity.order_id;
      const razorpayPaymentId = body.payload.payment.entity.id;

      console.log("💰 Processing payment:", {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
      });

      const paymentRepo = AppDataSource.getRepository(Payment);
      const orderRepo = AppDataSource.getRepository(Order);

      const payment = await paymentRepo.findOne({
        where: { transactionId: razorpayOrderId },
        relations: { order: true },
      });

      if (payment) {
        payment.status = PaymentStatus.SUCCESS;
        payment.transactionId = razorpayPaymentId;
        payment.order.status = OrderStatus.PAID;

        await paymentRepo.save(payment);
        await orderRepo.save(payment.order);

        console.log("✅ Payment updated successfully");
      } else {
        console.warn("⚠️ Payment not found for order:", razorpayOrderId);
      }
    }

    return res.status(200).json({ received: true, verified: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return res.status(200).json({
      received: true,
      error: "Processing failed",
    });
  }
};

export const downloadInvoice = async (req: Request, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const { orderId } = req.params;
  const user_id = 1;

  console.log("ORDER ID:", orderId);
  console.log("USER ID:", user_id);

  try {
    const order = await orderRepo.findOne({
      where: {
        id: Number(orderId),
        user: {
          id: user_id,
        },
      },
      relations: { user: true, orderItems: { variant: { product: true } } },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("CHECKING TOTAL AMOUNT", order.totalAmount);

    const html = `
    <html>
      <head>
        <title>Invoice</title>
        <style>
          body { font-family: Arial; }
          table { width: 100%; border-collapse: collapse; }
          td, th { border: 1px solid #ddd; padding: 8px; }
        </style>
      </head>
      <body>
        <h1>Invoice</h1>
        <p>Order ID: ${order?.id}</p>
        <p>Customer: ${order?.user?.name}</p>

        <table>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
          ${order?.orderItems
            .map(
              (item: any) => `
            <tr>
              <td>${item.variant.product.name}</td>
              <td>${item.quantity}</td>
              <td>${item.variant.price}</td>
            </tr>
          `,
            )
            .join("")}
        </table>

        <h3>Total: ₹${order?.totalAmount}</h3>
      </body>
    </html>
  `;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order.id}.html`,
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error downloading invoice:", error);
    return res
      .status(500)
      .json({ message: "Error downloading invoice", error });
  }
};
