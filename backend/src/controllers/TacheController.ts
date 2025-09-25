import { Request, Response } from "express";
import { Tache } from "@prisma/client";
import { TacheService } from "../services/TacheService.js";
import { CreateUserSchema } from "../validator/TacheValidator.js"; 
import { PrismaClient, Droit } from "@prisma/client";

const prisma = new PrismaClient();
const ndeyeService = new TacheService();

export class TacheController {

    static async getAll(_req: Request, res: Response) {
        try {
            const ndeyeUsers = await ndeyeService.getAllUsers();
            res.json(ndeyeUsers);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findById(req: Request, res: Response) {
        try {
            const ndeyeId: number = Number(req.params.id);
            const ndeyeUser = await ndeyeService.findUserById(ndeyeId);
            if (!ndeyeUser) return res.status(404).json({ error: "Utilisateur non trouvé" });
            return res.json(ndeyeUser);
        } catch (error: any) {
           return res.status(400).json({ error: error.message });
        }
    }

   

 static async create(req: Request, res: Response) {
    try {
        if (req.body.status) req.body.status = req.body.status === "true";

        const ndeyeData = CreateUserSchema.parse({
            ...req.body,
            status: req.body.status ?? false
        });

        const imagePath = req.files && "image" in req.files ? (req.files as any).image[0].filename : null;
        const audioPath = req.files && "audio" in req.files ? (req.files as any).audio[0].filename : null;

        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Utilisateur non connecté" });

        const ndeyeTache = await ndeyeService.createUser({
            ...ndeyeData,
            userId,
            image: imagePath,
            audio: audioPath
        });

        return res.status(201).json(ndeyeTache);
    } catch (error: any) {
        const ndeyeErrors = error.errors ?? [{ message: error.message }];
        return res.status(400).json({ ndeyeErrors });
    }
}

static async update(req: Request, res: Response) {
    try {
        const ndeyeId: number = Number(req.params.id);
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Utilisateur non connecté" });

        const ndeyeData = CreateUserSchema.parse(req.body) as Partial<Omit<Tache, "id">>;

        const imagePath = req.files && "image" in req.files ? (req.files as any).image[0].filename : undefined;
        const audioPath = req.files && "audio" in req.files ? (req.files as any).audio[0].filename : undefined;

        if (imagePath) ndeyeData.image = imagePath;
        if (audioPath) ndeyeData.audio = audioPath;

        const ndeyeTache = await ndeyeService.updateUser(ndeyeId, ndeyeData, userId);

        return res.json(ndeyeTache);
    } catch (error: any) {
        const errors = error.errors ?? [{ message: error.message }];
        return res.status(400).json({ errors });
    }
}

static async uploadAudio(req: Request, res: Response) {
    try {
        const ndeyeId: number = Number(req.params.id);
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Utilisateur non connecté" });

        if (!req.file) {
            return res.status(400).json({ error: "Aucun fichier audio fourni" });
        }

        const audioPath = req.file.filename;

        // Mise à jour de la tâche avec le fichier audio
        const ndeyeTache = await ndeyeService.updateUser(
            ndeyeId,
            { audio: audioPath },
            userId
        );

        return res.json({
            message: "Audio ajouté avec succès",
            tache: ndeyeTache,
        });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

   static async delete(req: Request, res: Response) {
    try {
        const ndeyeId: number = Number(req.params.id);
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Utilisateur non connecté" });

        await ndeyeService.deleteUser(ndeyeId, userId);
        return res.status(204).send(); // <-- ajouter return
    } catch (error: any) {
        return res.status(400).json({ error: error.message }); // <-- ajouter return
    }
}


    static async up(req: Request, res: Response){
    try {
        const ndeyeId: number = Number(req.params.id);
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Utilisateur non connecté" });

        const ndeyeTache = await ndeyeService.updateStatus(ndeyeId, userId);
        return res.json(ndeyeTache); // <-- ajouter return
    } catch (error: any) {
        return res.status(400).json({ errors: [{ message: error.message }] }); // <-- ajouter return
    }
}

    static async assignerPermission(req: Request, res: Response) {
        try {
            const tacheId = Number(req.params.id);
            const { userId, droit } = req.body;

            const tache = await prisma.tache.findUnique({ where: { id: tacheId } });
            if (!tache) return res.status(404).json({ erreur: "Tâche introuvable" });

            if (tache.userId !== req.user?.id) {
                return res.status(403).json({ erreur: "Vous ne pouvez attribuer des droits que sur vos propres tâches" });
            }

            if (!Object.values(Droit).includes(droit)) {
                return res.status(400).json({ erreur: "Droit invalide" });
            }

            const permission = await prisma.permission.upsert({
                where: { userId_tacheId: { userId, tacheId } },
                update: { droit },
                create: { userId, tacheId, droit }
            });

            return res.json(permission);
        } catch (err: any) {
            return res.status(400).json({ erreur: err.message });
        }
    }
    static async getHistorique(req: Request, res: Response) {
    try {
        const tacheId = Number(req.params.id);

        // Vérifier si la tâche existe
        const tache = await prisma.tache.findUnique({ where: { id: tacheId } });
        if (!tache) {
            return res.status(404).json({ error: "Tâche introuvable" });
        }

        // Récupérer l’historique
        const historique = await prisma.historique.findMany({
            where: { tacheId },
            orderBy: { date: "desc" }, // plus récent d'abord
            include: { user: true } // si tu veux inclure info utilisateur
        });

        return res.json(historique);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

}
