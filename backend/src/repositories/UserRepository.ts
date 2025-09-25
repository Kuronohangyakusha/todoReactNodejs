import { PrismaClient , User } from "@prisma/client";
import type { IRepository } from "./Irepository.js";

export class UserRepository implements IRepository<User> {
    private ndeyePrisma: PrismaClient = new PrismaClient();

    async findAll(): Promise<User[]> {
        return this.ndeyePrisma.user.findMany({ include: { taches: true } });
    }

    async findById(id: number): Promise<User | null> {
        return this.ndeyePrisma.user.findUnique({ where: { id } , include: { taches: true } });
    }

    async create(data: Omit<User, "id">): Promise<User> {
        return this.ndeyePrisma.user.create({ data });
    }

    async update(id: number, data: Partial<Omit<User, "id">>): Promise<User> {
        return this.ndeyePrisma.user.update({ where: { id }, data });
    }

    async delete(id: number): Promise<void> {
        await this.ndeyePrisma.user.delete({ where: { id } });
    }
    async findByLogin(login: string): Promise<User | null> {
        return this.ndeyePrisma.user.findUnique({ where: { login } });
    }
}