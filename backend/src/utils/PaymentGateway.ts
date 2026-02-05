import Razorpay from "razorpay";
import crypto from "crypto";

export class PaymentGateway {
  private static instance: PaymentGateway;
  public razorpay: Razorpay;

  private constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.TEST_API_KEY || "",
      key_secret: process.env.TEST_API_SECRET || "",
    });
  }

  public static getInstance(): PaymentGateway {
    if (!PaymentGateway.instance) {
      PaymentGateway.instance = new PaymentGateway();
    }
    return PaymentGateway.instance;
  }

  async createOrder(amount: number, receiptId: string) {
    return this.razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: receiptId,
    });
  }

  verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
  ): boolean {
    const body = `${razorpayOrderId}|${razorpayPaymentId}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.TEST_API_SECRET!)
      .update(body)
      .digest("hex");

    return expectedSignature === razorpaySignature;
  }

  webhookHandler(reqBody: string, signature: string): boolean {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.TEST_API_SECRET!)
      .update(reqBody)
      .digest("hex");

    return expectedSignature === signature;
  }
}
