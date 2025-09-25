import { PrismaClient, Tache } from "@prisma/client";
import type { IRepository } from "./Irepository.js";

export class TachesRepository implements IRepository<Tache> {
    private ndeyePrisma: PrismaClient = new PrismaClient();

    async findAll(): Promise<Tache[]> {
        return this.ndeyePrisma.tache.findMany({
            include: { user: true },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findById(id: number): Promise<Tache | null> {
        return this.ndeyePrisma.tache.findUnique({
            where: { id },
            include: { user: true },
        });
    }

   async create(data: Omit<Tache, "id" | "createdAt">): Promise<Tache> {
    return this.ndeyePrisma.tache.create({
        data: {
            nom: data.nom,
            description: data.description,
            status: data.status ?? false,
            image: data.image ?? null,
            audio: data.audio ?? null,
            user: { connect: { id: data.userId } }, // Prisma gère createdAt automatiquement

        },
    });
}

    async update(id: number, data: Partial<Omit<Tache, "id">>): Promise<Tache> {
        return this.ndeyePrisma.tache.update({ where: { id }, data });
    }

    async delete(id: number): Promise<void> {
        await this.ndeyePrisma.tache.delete({ where: { id } });
    }

    async updateStatus(id: number): Promise<Tache> {
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
