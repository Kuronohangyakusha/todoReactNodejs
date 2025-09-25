import { PrismaClient } from "@prisma/client";
export class TachesRepository {
    ndeyePrisma = new PrismaClient();
    async findAll() {
        return this.ndeyePrisma.tache.findMany({
            include: { user: true },
            orderBy: { createdAt: 'desc' }
        });
    }
    async findById(id) {
        return this.ndeyePrisma.tache.findUnique({
            where: { id },
            include: { user: true },
        });
    }
    async create(data) {
        return this.ndeyePrisma.tache.create({
            data: {
                nom: data.nom,
                description: data.description,
                status: data.status ?? false,
                image: data.image ?? null,
                user: { connect: { id: data.userId } }, // Prisma gère createdAt automatiquement
            },
        });
    }
    async update(id, data) {
        return this.ndeyePrisma.tache.update({ where: { id }, data });
    }
    async delete(id) {
        await this.ndeyePrisma.tache.delete({ where: { id } });
    }
    async updateStatus(id) {
        const tache = await this.ndeyePrisma.tache.findUnique({ where: { id } });
        if (!tache) {
            throw new Error("Tâche introuvable");
        }
        return this.ndeyePrisma.tache.update({
            where: { id },
            data: { status: !tache.status },
        });
    }
}
//# sourceMappingURL=TachesRepository.js.map