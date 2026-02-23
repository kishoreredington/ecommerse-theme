import { type Request, type Response } from "express";
export declare const createOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const webhookPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const downloadInvoice: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=cartController.d.ts.map