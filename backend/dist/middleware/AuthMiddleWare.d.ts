import { Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                login: string;
            };
        }
    }
}
export declare class AuthMiddleWare {
    static verifyToken(req: Request, res: Response, next: Function): void | Response;
}
//# sourceMappingURL=AuthMiddleWare.d.ts.map