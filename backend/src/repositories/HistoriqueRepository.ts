import { PrismaClient, Historique } from "@prisma/client";

export class HistoriqueRepository {
    private prisma: PrismaClient = new PrismaClient();

    async create(history: Omit<Historique, "id">): Promise<Historique> {
        return this.prisma.historique.create({ data: history });
    }

    async findByTache(tacheId: number): Promise<Historique[]> {
        return this.prisma.historique.findMany({
            where: { tacheId },
            include: { user: true },
            orderBy: { date: "desc" }
        });
    }
}
