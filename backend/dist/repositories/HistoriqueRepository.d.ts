import { Historique } from "@prisma/client";
export declare class HistoriqueRepository {
    private prisma;
    create(history: Omit<Historique, "id">): Promise<Historique>;
    findByTache(tacheId: number): Promise<Historique[]>;
}
//# sourceMappingURL=HistoriqueRepository.d.ts.map