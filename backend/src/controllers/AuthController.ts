import { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";
const authService = new AuthService();

export class AuthController {
    static async login(req: Request, res: Response) {
    try {
        const { login, password } = req.body;
        const { token, id } = await authService.authenticate(login, password);

        res.json({ token, id });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

}