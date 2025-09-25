import { Tache } from "@prisma/client";
export declare class TacheService {
    private ndeyeRepo;
    private historiqueRepo;
    constructor();
    getAllUsers(): Promise<Tache[]>;
    findUserById(id: number): Promise<Tache | null>;
    createUser(data: Omit<Tache, "id" | "createdAt"> & {
        userId: number;
    }): Promise<Tache>;
    updateUser(id: number, data: Partial<Omit<Tache, "id">>, userId: number): Promise<Tache>;
    deleteUser(id: number, userId: number): Promise<void>;
    updateStatus(id: number, userId: number): Promise<Tache>;
    getHistorique(tacheId: number): Promise<{
        id: number;
        userId: number;
        tacheId: number;
        action: string;
        date: Date;
        details: string | null;
    }[]>;
}
//# sourceMappingURL=TacheService.d.ts.map