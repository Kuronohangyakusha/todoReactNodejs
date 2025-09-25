import { UserRepository } from "../repositories/UserRepository.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
export class AuthService {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }
    async authenticate(login, password) {
        const user = await this.userRepository.findByLogin(login);
        if (!user) {
            throw new Error("Authentification échouée");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Authentification échouée");
        }
        const payload = { id: user.id, login: user.login };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        return { token, id: user.id };
    }
}
//# sourceMappingURL=AuthService.js.map