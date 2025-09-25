import { UserController } from "../controllers/UserController.js";
import { Router } from "express";
import { AuthMiddleWare } from "../middleware/AuthMiddleWare.js";
const router = Router();
// Route ouverte pour créer un utilisateur
router.post("/", UserController.create);
// Routes protégées (toutes les autres)
router.get("/", AuthMiddleWare.verifyToken, UserController.getAll);
router.get("/:id", AuthMiddleWare.verifyToken, UserController.findById);
router.put("/:id", AuthMiddleWare.verifyToken, UserController.update);
router.delete("/:id", AuthMiddleWare.verifyToken, UserController.delete);
export default router;
//# sourceMappingURL=UserRoute.js.map