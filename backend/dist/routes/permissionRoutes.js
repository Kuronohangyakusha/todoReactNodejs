// routes/permissionRoutes.js
import { Router } from "express";
import { PermissionController } from "../controllers/PermissionController.js";
const router = Router();
// GET /permissions/tache/:tacheId - Récupérer les permissions d'une tâche
router.get("/tache/:tacheId", PermissionController.getPermissionsByTache);
// GET /permissions/user/:userId - Récupérer les permissions d'un utilisateur
router.get("/user/:userId", PermissionController.getPermissionsByUser);
// POST /permissions - Créer une nouvelle permission
router.post("/", PermissionController.createPermission);
// DELETE /permissions/:id - Supprimer une permission
router.delete("/:id", PermissionController.deletePermission);
export default router;
//# sourceMappingURL=permissionRoutes.js.map