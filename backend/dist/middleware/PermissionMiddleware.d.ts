import { Request, Response } from "express";
import { Droit } from "@prisma/client";
export declare class PermissionMiddleware {
    static verifierDroit(droit: Droit): (req: Request, res: Response, next: Function) => Promise<any>;
}
//# sourceMappingURL=PermissionMiddleware.d.ts.map