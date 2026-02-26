import type { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
export declare const verifyJWT: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=middleware.d.ts.map