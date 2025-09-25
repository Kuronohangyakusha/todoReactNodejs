import { Request, Response } from "express";
declare class PermisMiddlware {
    private tacheService;
    constructor();
    VerifyPermission(req: Request, res: Response, next: Function): Promise<void | Response>;
}
export declare const permisMiddlware: PermisMiddlware;
export {};
//# sourceMappingURL=PermisMiddlware.d.ts.map