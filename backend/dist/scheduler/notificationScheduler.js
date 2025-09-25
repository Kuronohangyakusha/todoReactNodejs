import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import { io } from "../index.js";
const prisma = new PrismaClient();
cron.schedule("* * * * *", async () => {
    const now = new Date();
    const taches = await prisma.tache.findMany({
        where: {
            dateFin: { lte: now },
            status: false,
        },
        include: { user: true },
    });
    for (const t of taches) {
        console.log(`🔔 Notification : La tâche "${t.nom}" est arrivée à échéance.`);
        // Notification en temps réel via WebSocket
        io.emit("tacheEcheance", {
            id: t.id,
            nom: t.nom,
            userId: t.userId,
            message: `Votre tâche "${t.nom}" est arrivée à échéance !`,
        });
        await prisma.tache.update({
            where: { id: t.id },
            data: { status: true },
        });
    }
});
//# sourceMappingURL=notificationScheduler.js.map