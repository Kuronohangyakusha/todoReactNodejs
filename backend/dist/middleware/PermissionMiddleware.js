import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class PermissionMiddleware {
    static verifierDroit(droit) {
        return async (req, res, next) => {
            const utilisateurId = req.user?.id;
            const tacheId = Number(req.params.id);
            if (!utilisateurId || isNaN(tacheId)) {
                return res.status(400).json({ erreur: "Utilisateur ou tâche invalide" });
            }
            const tache = await prisma.tache.findUnique({
                where: { id: tacheId },
                include: { user: true },
            });
            if (!tache) {
                return res.status(404).json({ erreur: "Tâche introuvable" });
            }
            if (tache.userId === utilisateurId) {
                return next();
            }
            const permission = await prisma.permission.findFirst({
                where: {
                    tacheId: tacheId,
                    userId: utilisateurId,
                    droit: droit
                }
            });
            if (!permission) {
                return res.status(403).json({ erreur: "Accès refusé, permission manquante" });
            }
            next();
        };
    }
}
//# sourceMappingURL=PermissionMiddleware.js.map