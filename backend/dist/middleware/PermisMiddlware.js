import dotenv from "dotenv";
import { TacheService } from "../services/TacheService.js";
dotenv.config();
class PermisMiddlware {
    tacheService;
    constructor() {
        this.tacheService = new TacheService();
    }
    async VerifyPermission(req, res, next) {
        const userId = req.user?.id;
        const TacheId = req.params.id;
        if (!TacheId) {
            return res.status(400).json({ error: "Tache ID manquant" });
        }
        const tache = await this.tacheService.findUserById(parseInt(TacheId));
        if (!tache) {
            return res.status(404).json({ error: "Tache non trouvée" });
        }
        if (tache.userId !== userId) {
            return res.status(403).json({ error: "Accès refusé, pas de permission" });
        }
        next();
    }
}
export const permisMiddlware = new PermisMiddlware();
//# sourceMappingURL=PermisMiddlware.js.map