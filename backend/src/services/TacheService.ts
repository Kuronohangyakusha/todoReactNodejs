import { Tache } from "@prisma/client";
import { TachesRepository } from "../repositories/TachesRepository.js";
import { HistoriqueRepository } from "../repositories/HistoriqueRepository.js";

export class TacheService {
    private ndeyeRepo: TachesRepository;
    private historiqueRepo: HistoriqueRepository;

    constructor() {
        this.ndeyeRepo = new TachesRepository();
        this.historiqueRepo = new HistoriqueRepository();
    }

    getAllUsers(): Promise<Tache[]> {
        return this.ndeyeRepo.findAll();
    }

    findUserById(id: number): Promise<Tache | null> {
        return this.ndeyeRepo.findById(id);
    }

     async createUser(data: Omit<Tache, "id" | "createdAt"> & { userId: number }): Promise<Tache> {
    const tache = await this.ndeyeRepo.create({ ...data, image: data.image ?? null });

    await this.historiqueRepo.create({
        action: "Création",
        tacheId: tache.id,
        userId: data.userId,
        details: `Tâche "${tache.nom}" créée`,
        date: new Date() // obligatoire pour TypeScript
    });

    return tache;
}

    async updateUser(id: number, data: Partial<Omit<Tache, "id">>, userId: number): Promise<Tache> {
        const tache = await this.ndeyeRepo.update(id, data);

     await this.historiqueRepo.create({
    action: "Modification",
    tacheId: tache.id,
    userId,
    details: `Champs modifiés: ${JSON.stringify(data)}`,
    date: new Date()  
});


        return tache;
    }

    async deleteUser(id: number, userId: number): Promise<void> {
    const tache = await this.ndeyeRepo.findById(id);
    if (!tache) throw new Error("Tâche introuvable");
 
    await this.historiqueRepo.create({
        action: "Suppression",
        tacheId: tache.id,
        userId,
        details: `Tâche "${tache.nom}" supprimée`,
        date: new Date()
    });
 
    await this.ndeyeRepo.delete(id);
}

    async updateStatus(id: number, userId: number): Promise<Tache> {
        const tache = await this.ndeyeRepo.updateStatus(id);

      await this.historiqueRepo.create({
    action: "Changement de statut",
    tacheId: tache.id,
    userId,
    details: `Status changé à ${tache.status}`,
    date: new Date()   
});

        return tache;
    }

    async getHistorique(tacheId: number) {
        return this.historiqueRepo.findByTache(tacheId);
    }
}
