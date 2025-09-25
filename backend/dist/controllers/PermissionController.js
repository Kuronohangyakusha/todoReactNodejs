import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class PermissionController {
    // GET /permissions/tache/:tacheId - Récupérer toutes les permissions d'une tâche
    static async getPermissionsByTache(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json({ error: "Utilisateur non authentifié" });
            const tacheId = parseInt(req.params.tacheId ?? "");
            if (isNaN(tacheId))
                return res.status(400).json({ error: "ID de tâche invalide" });
            const tache = await prisma.tache.findUnique({ where: { id: tacheId } });
            if (!tache)
                return res.status(404).json({ error: "Tâche introuvable" });
            if (tache.userId !== userId)
                return res.status(403).json({ error: "Vous ne pouvez voir que vos propres tâches" });
            const permissions = await prisma.permission.findMany({
                where: { tacheId },
                include: { user: { select: { id: true, login: true } } },
                orderBy: { id: "desc" }
            });
            return res.json(permissions);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erreur serveur" });
        }
    }
    static async createPermission(req, res) {
        try {
            const currentUserId = req.user?.id;
            if (!currentUserId)
                return res.status(401).json({ error: "Utilisateur non authentifié" });
            const { tacheId, userId, droit } = req.body;
            if (!tacheId || !userId || !droit)
                return res.status(400).json({ error: "Tous les champs sont requis" });
            const tache = await prisma.tache.findUnique({ where: { id: parseInt(tacheId) } });
            if (!tache)
                return res.status(404).json({ error: "Tâche introuvable" });
            if (tache.userId !== currentUserId)
                return res.status(403).json({ error: "Vous ne pouvez accorder des permissions que sur vos propres tâches" });
            const targetUser = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
            if (!targetUser)
                return res.status(404).json({ error: "Utilisateur introuvable" });
            const existingPermission = await prisma.permission.findFirst({
                where: { tacheId: parseInt(tacheId), userId: parseInt(userId), droit }
            });
            if (existingPermission)
                return res.status(409).json({ error: "Cette permission existe déjà" });
            const newPermission = await prisma.permission.create({
                data: { tacheId: parseInt(tacheId), userId: parseInt(userId), droit },
                include: { user: { select: { id: true, login: true } } }
            });
            return res.status(201).json(newPermission);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erreur serveur" });
        }
    }
    // DELETE /permissions/:id - Supprimer une permission
    static async deletePermission(req, res) {
        try {
            const currentUserId = req.user?.id;
            if (!currentUserId)
                return res.status(401).json({ error: "Utilisateur non authentifié" });
            const permissionId = parseInt(req.params.id ?? "");
            if (isNaN(permissionId))
                return res.status(400).json({ error: "ID de permission invalide" });
            const permission = await prisma.permission.findUnique({
                where: { id: permissionId },
                include: { tache: true }
            });
            if (!permission)
                return res.status(404).json({ error: "Permission introuvable" });
            if (permission.tache.userId !== currentUserId)
                return res.status(403).json({ error: "Vous ne pouvez supprimer que les permissions de vos propres tâches" });
            await prisma.permission.delete({ where: { id: permissionId } });
            return res.json({ message: "Permission supprimée avec succès" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erreur serveur" });
        }
    }
}
//# sourceMappingURL=PermissionController.js.map