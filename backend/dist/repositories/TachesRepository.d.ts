import { Tache } from "@prisma/client";
import type { IRepository } from "./Irepository.js";
export declare class TachesRepository implements IRepository<Tache> {
    private ndeyePrisma;
    findAll(): Promise<Tache[]>;
    findById(id: number): Promise<Tache | null>;
    create(data: Omit<Tache, "id" | "createdAt">): Promise<Tache>;
    update(id: number, data: Partial<Omit<Tache, "id">>): Promise<Tache>;
    delete(id: number): Promise<void>;
    updateStatus(id: number): Promise<Tache>;
}
//# sourceMappingURL=TachesRepository.d.ts.map