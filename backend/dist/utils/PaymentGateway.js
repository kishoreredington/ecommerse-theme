import Razorpay from "razorpay";
import crypto from "crypto";
export class PaymentGateway {
    static instance;
    razorpay;
    constructor() {
        this.razorpay = new Razorpay({
            key_id: process.env.TEST_API_KEY || "",
            key_secret: process.env.TEST_API_SECRET || "",
        });
    }
    static getInstance() {
        if (!PaymentGateway.instance) {
            PaymentGateway.instance = new PaymentGateway();
        }
        return PaymentGateway.instance;
    }
    async createOrder(amount, receiptId) {
        return this.razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: receiptId,
        });
    }
    verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
        const body = `${razorpayOrderId}|${razorpayPaymentId}`;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.TEST_API_SECRET)
            .update(body)
            .digest("hex");
        return expectedSignature === razorpaySignature;
    }
    webhookHandler(reqBody, signature) {
        const expectedSignature = crypto
            .createHmac("sha256", process.env.TEST_API_SECRET)
            .update(reqBody)
            .digest("hex");
        return expectedSignature === signature;
    }
}
//# sourceMappingURL=PaymentGateway.js.map