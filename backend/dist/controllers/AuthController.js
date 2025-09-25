import { AuthService } from "../services/AuthService.js";
const authService = new AuthService();
export class AuthController {
    static async login(req, res) {
        try {
            const { login, password } = req.body;
            const { token, id } = await authService.authenticate(login, password);
            res.json({ token, id });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=AuthController.js.map