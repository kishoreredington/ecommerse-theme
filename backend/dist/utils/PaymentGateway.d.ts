import Razorpay from "razorpay";
export declare class PaymentGateway {
    private static instance;
    razorpay: Razorpay;
    private constructor();
    static getInstance(): PaymentGateway;
    createOrder(amount: number, receiptId: string): Promise<import("razorpay/dist/types/orders.js").Orders.RazorpayOrder>;
    verifyPayment(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string): boolean;
    webhookHandler(reqBody: string, signature: string): boolean;
}
//# sourceMappingURL=PaymentGateway.d.ts.map