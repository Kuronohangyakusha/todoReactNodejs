import { Request, Response } from "express";
export declare class PermissionController {
    static getPermissionsByTache(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getPermissionsByUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createPermission(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deletePermission(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=PermissionController.d.ts.map