import { type Request, type Response } from "express";
export declare const getAllProducts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getSpecificProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const uploadProduct: (req: Request, res: Response) => Promise<void>;
export declare const getAllUserOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const makeFavourite: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addToCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const removeFromCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAddToCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=productController.d.ts.map