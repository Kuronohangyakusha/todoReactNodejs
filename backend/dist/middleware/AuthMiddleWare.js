import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
export class AuthMiddleWare {
    static verifyToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Accès refusé, token manquant" });
        }
        try {
            const payload = jwt.verify(token, JWT_SECRET);
            req.user = payload;
            next();
        }
        catch (error) {
            return res.status(403).json({ error: "Token invalide" });
        }
    }
}
//# sourceMappingURL=AuthMiddleWare.js.map