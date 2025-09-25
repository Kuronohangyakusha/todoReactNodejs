import { User } from "@prisma/client";
export declare class UserService {
    private userRepository;
    constructor();
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    create(data: Omit<User, "id">): Promise<User>;
    update(id: number, data: Partial<Omit<User, "id">>): Promise<User>;
    delete(id: number): Promise<void>;
    findByLogin(login: string): Promise<User | null>;
}
//# sourceMappingURL=UserService.d.ts.map