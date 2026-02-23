import crypto from "crypto";
import {} from "express";
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
import { html } from "../utils/paymentHTML.js";
export const createOrder = async (req, res) => {
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
            if (!variant)
                throw new Error("Variant not found");
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
        const orderItems = [];
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
        const strapiOrder = await PaymentGateway.getInstance().createOrder(totalPrice, options.receipt);
        const payment = paymentRepo.create({
            order,
            provider: "razerpay",
            transactionId: strapiOrder.id,
            status: PaymentStatus.PENDING,
        });
        paymentRepo.save(payment);
        return res.status(200).json({ strapiOrder, orderId: order.id });
    }
    catch (err) {
        return res.status(500).json({ message: "Order creation failed", err });
    }
};
export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const isValid = PaymentGateway.getInstance().verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
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
        }
        catch (error) {
            return res.status(400).json({ message: "verification failed" });
        }
    }
    else {
        return res.status(400).json({ message: "verification failed" });
    }
};
export const webhookPayment = async (req, res) => {
    try {
        const signature = req.headers["x-razorpay-signature"];
        if (!signature) {
            return res.status(400).json({ message: "Missing signature" });
        }
        let rawBody;
        if (Buffer.isBuffer(req.body)) {
            console.log("BUFFER");
            rawBody = req.body.toString("utf8");
        }
        else if (typeof req.body === "string") {
            rawBody = req.body;
        }
        else {
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
            }
            else {
                console.warn("⚠️ Payment not found for order:", razorpayOrderId);
            }
        }
        return res.status(200).json({ received: true, verified: true });
    }
    catch (error) {
        console.error("❌ Webhook error:", error);
        return res.status(200).json({
            received: true,
            error: "Processing failed",
        });
    }
};
export const downloadInvoice = async (req, res) => {
    const orderRepo = AppDataSource.getRepository(Order);
    const { orderId } = req.params;
    const user_id = 1;
    try {
        const order = await orderRepo.findOne({
            where: {
                id: Number(orderId),
                user: {
                    id: user_id,
                },
            },
            relations: {
                user: true,
                address: true,
                orderItems: { variant: { product: true } },
            },
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice #${order.id}</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
    
          body {
            font-family: 'Montserrat', sans-serif;
            background: #f5f5f5;
            color: #111;
            padding: 40px;
          }
    
          .invoice-wrapper {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
          }
    
          /* ── Header ── */
          .invoice-header {
            background: linear-gradient(180deg, #0b1626 0%, #050b15 100%);
            color: white;
            padding: 48px 48px 40px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
    
          .brand {
            display: flex;
            align-items: center;
            gap: 10px;
          }
    
          .brand-dot {
            width: 18px;
            height: 18px;
            background: white;
            border-radius: 50%;
          }
    
          .brand-name {
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
          }
    
          .invoice-label {
            text-align: right;
          }
    
          .invoice-label h1 {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 4px;
            text-transform: uppercase;
            opacity: 0.6;
            margin-bottom: 6px;
          }
    
          .invoice-label .invoice-number {
            font-size: 28px;
            font-weight: 800;
            letter-spacing: 1px;
          }
    
          .invoice-label .invoice-date {
            font-size: 12px;
            opacity: 0.55;
            margin-top: 6px;
            letter-spacing: 1px;
          }
    
          /* ── Info Bar ── */
          .invoice-info {
            display: flex;
            justify-content: space-between;
            padding: 28px 48px;
            border-bottom: 1px solid #ebebeb;
            background: #fafafa;
          }
    
          .info-block h4 {
            font-size: 9px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #999;
            margin-bottom: 8px;
          }
    
          .info-block p {
            font-size: 14px;
            font-weight: 600;
            color: #111;
          }
    
          .info-block p.sub {
            font-size: 12px;
            font-weight: 400;
            color: #777;
            margin-top: 2px;
          }
    
          /* ── Table ── */
          .invoice-table {
            padding: 36px 48px;
          }
    
          table {
            width: 100%;
            border-collapse: collapse;
          }
    
          thead tr {
            border-bottom: 2px solid #111;
          }
    
          thead th {
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #111;
            padding: 0 0 14px 0;
            text-align: left;
          }
    
          thead th.text-right { text-align: right; }
    
          tbody tr {
            border-bottom: 1px solid #f0f0f0;
          }
    
          tbody td {
            padding: 18px 0;
            font-size: 13px;
            color: #333;
            font-weight: 400;
            vertical-align: top;
          }
    
          tbody td.text-right { text-align: right; }
    
          .product-name {
            font-weight: 600;
            font-size: 14px;
            color: #111;
            margin-bottom: 3px;
          }
    
          .product-index {
            font-size: 10px;
            color: #bbb;
            letter-spacing: 1px;
          }
    
          /* ── Totals ── */
          .invoice-totals {
            padding: 0 48px 48px;
            display: flex;
            justify-content: flex-end;
          }
    
          .totals-box {
            width: 280px;
          }
    
          .totals-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            font-size: 13px;
            color: #555;
            border-bottom: 1px solid #f0f0f0;
          }
    
          .totals-row.total {
            background: linear-gradient(180deg, #0b1626 0%, #050b15 100%);
            color: white;
            padding: 16px 20px;
            margin-top: 8px;
            border-bottom: none;
          }
    
          .totals-row.total .label {
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            opacity: 0.7;
          }
    
          .totals-row.total .amount {
            font-size: 20px;
            font-weight: 800;
          }
    
          /* ── Footer ── */
          .invoice-footer {
            background: linear-gradient(180deg, #0b1626 0%, #050b15 100%);
            color: white;
            padding: 24px 48px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
    
          .footer-badges {
            display: flex;
            gap: 24px;
            font-size: 10px;
            letter-spacing: 2px;
            text-transform: uppercase;
            opacity: 0.6;
          }
    
          .footer-badges span::before {
            content: "● ";
            font-size: 6px;
            vertical-align: middle;
            margin-right: 4px;
          }
    
          .footer-thank {
            font-size: 10px;
            letter-spacing: 2px;
            text-transform: uppercase;
            opacity: 0.5;
          }
        </style>
      </head>
      <body>
        <div class="invoice-wrapper">
    
          <!-- Header -->
          <div class="invoice-header">
            <div class="brand">
              <div class="brand-dot"></div>
              <span class="brand-name">Zen</span>
            </div>
            <div class="invoice-label">
              <h1>Invoice</h1>
              <div class="invoice-number">#INV-${String(order.id).padStart(5, "0")}</div>
              <div class="invoice-date">${new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })}</div>
            </div>
          </div>
    
          <!-- Info Bar -->
<div class="invoice-info">
  <div class="info-block">
    <h4>Billed To</h4>
    <p>${order.user.name}</p>
    <p class="sub">${order.user.email ?? ""}</p>
  </div>

  <!-- Add this block -->
  <div class="info-block" style="text-align:center;">
    <h4>Delivery Address</h4>
    <p style="font-weight:500;">${order.address.line1}</p>
    <p class="sub">${order.address.city}, ${order.address.state}</p>
    <p class="sub">${order.address.pincode}, ${order.address.country}</p>
  </div>

  <div class="info-block" style="text-align:right;">
    <h4>Order Reference</h4>
    <p>#${order.id}</p>
    <p class="sub">Status: Confirmed</p>
  </div>
</div>

    
          <!-- Table -->
          <div class="invoice-table">
            <table>
              <thead>
                <tr>
                  <th style="width:40px;">#</th>
                  <th>Product</th>
                  <th class="text-right">Qty</th>
                  <th class="text-right">Unit Price</th>
                  <th class="text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${order.orderItems
            .map((item, index) => `
                  <tr>
                    <td><span class="product-index">0${index + 1}</span></td>
                    <td>
                      <div class="product-name">${item.variant.product.name}</div>
                      <div style="font-size:11px; color:#999; margin-top:2px; letter-spacing:1px;">${item.variant.size ?? ""}</div>
                    </td>
                    <td class="text-right">${item.quantity}</td>
                    <td class="text-right">₹${Number(item.variant.price).toLocaleString("en-IN")}</td>
                    <td class="text-right" style="font-weight:600;">₹${(item.quantity * Number(item.variant.price)).toLocaleString("en-IN")}</td>
                  </tr>
                `)
            .join("")}
              </tbody>
            </table>
          </div>
    
          <!-- Totals -->
          <div class="invoice-totals">
            <div class="totals-box">
              <div class="totals-row">
                <span>Subtotal</span>
                <span>₹${Number(order.totalAmount).toLocaleString("en-IN")}</span>
              </div>
              <div class="totals-row">
                <span>Shipping</span>
                <span style="color:#111; font-weight:600;">FREE</span>
              </div>
              <div class="totals-row total">
                <span class="label">Total</span>
                <span class="amount">₹${Number(order.totalAmount).toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
    
          <!-- Footer -->
          <div class="invoice-footer">
            <div class="footer-badges">
              <span>Secure Checkout</span>
              <span>Free Returns</span>
            </div>
            <div class="footer-thank">Thank you for your purchase</div>
          </div>
    
        </div>
      </body>
    </html>
    `;
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage", // important for low-memory servers
            ],
        });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" }); // ← here
        await page.setContent(html);
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
        });
        await browser.close();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=invoice-${order.id}.html`);
        res.send(pdfBuffer);
    }
    catch (error) {
        console.error("Error downloading invoice:", error);
        return res
            .status(500)
            .json({ message: "Error downloading invoice", error });
    }
};
//# sourceMappingURL=cartController.js.map