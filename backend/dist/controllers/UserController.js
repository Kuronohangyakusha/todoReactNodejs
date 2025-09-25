import { UserService } from "../services/UserService.js";
import { createUserSchema } from "../validator/UserValidator.js";
const userService = new UserService();
export class UserController {
    static async getAll(_req, res) {
        try {
            const users = await userService.findAll();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async findById(req, res) {
        try {
            const userId = Number(req.params.id);
            const user = await userService.findById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json(user);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    static async create(req, res) {
        try {
            const parsedData = createUserSchema.parse(req.body);
            const existingUser = await userService.findByLogin(parsedData.login);
            if (existingUser) {
                return res.status(400).json({
                    errors: [
                        { field: "login", message: "Ce login existe déjà" }
                    ]
                });
            }
            const newUser = await userService.create(parsedData);
            return res.status(201).json(newUser);
        }
        catch (error) {
            if (error.name === "ZodError") {
                const validationErrors = error.errors?.map((e) => ({
                    field: e.path.join("."),
                    message: e.message
                })) || [];
                return res.status(400).json({ errors: validationErrors });
            }
            // ⚠️ Ici on ne tente pas d'accéder à error.errors
            return res.status(500).json({ error: error.message });
        }
    }
    static async update(req, res) {
        try {
            const userId = Number(req.params.id);
            const userData = req.body;
            const updatedUser = await userService.update(userId, userData);
            res.json(updatedUser);
        }
        catch (error) {
            const errors = error.errors ?? [{ message: error.message }];
            res.status(400).json({ errors });
        }
    }
    static async delete(req, res) {
        try {
            const userId = Number(req.params.id);
            await userService.delete(userId);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=UserController.js.map