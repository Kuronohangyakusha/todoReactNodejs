import { User } from "@prisma/client";
import type { IRepository } from "./Irepository.js";
export declare class UserRepository implements IRepository<User> {
    private ndeyePrisma;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    create(data: Omit<User, "id">): Promise<User>;
    update(id: number, data: Partial<Omit<User, "id">>): Promise<User>;
    delete(id: number): Promise<void>;
    findByLogin(login: string): Promise<User | null>;
}
//# sourceMappingURL=UserRepository.d.ts.map