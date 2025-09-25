import { PrismaClient } from "@prisma/client";
export class HistoriqueRepository {
    prisma = new PrismaClient();
    async create(history) {
        return this.prisma.historique.create({ data: history });
    }
    async findByTache(tacheId) {
        return this.prisma.historique.findMany({
            where: { tacheId },
            include: { user: true },
            orderBy: { date: "desc" }
        });
    }
}
//# sourceMappingURL=HistoriqueRepository.js.map