import { TachesRepository } from "../repositories/TachesRepository.js";
import { HistoriqueRepository } from "../repositories/HistoriqueRepository.js";
export class TacheService {
    ndeyeRepo;
    historiqueRepo;
    constructor() {
        this.ndeyeRepo = new TachesRepository();
        this.historiqueRepo = new HistoriqueRepository();
    }
    getAllUsers() {
        return this.ndeyeRepo.findAll();
    }
    findUserById(id) {
        return this.ndeyeRepo.findById(id);
    }
    async createUser(data) {
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
    async updateUser(id, data, userId) {
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
    async deleteUser(id, userId) {
        const tache = await this.ndeyeRepo.findById(id);
        if (!tache)
            throw new Error("Tâche introuvable");
        await this.historiqueRepo.create({
            action: "Suppression",
            tacheId: tache.id,
            userId,
            details: `Tâche "${tache.nom}" supprimée`,
            date: new Date()
        });
        await this.ndeyeRepo.delete(id);
    }
    async updateStatus(id, userId) {
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
    async getHistorique(tacheId) {
        return this.historiqueRepo.findByTache(tacheId);
    }
}
//# sourceMappingURL=TacheService.js.map