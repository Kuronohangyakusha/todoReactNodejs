import { Request, Response } from "express";
export declare class TacheController {
    static getAll(_req: Request, res: Response): Promise<void>;
    static findById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static uploadAudio(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static up(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static assignerPermission(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getHistorique(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getAllHistorique(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=TacheController.d.ts.map