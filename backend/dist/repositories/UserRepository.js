import { PrismaClient } from "@prisma/client";
export class UserRepository {
    ndeyePrisma = new PrismaClient();
    async findAll() {
        return this.ndeyePrisma.user.findMany({ include: { taches: true } });
    }
    async findById(id) {
        return this.ndeyePrisma.user.findUnique({ where: { id }, include: { taches: true } });
    }
    async create(data) {
        return this.ndeyePrisma.user.create({ data });
    }
    async update(id, data) {
        return this.ndeyePrisma.user.update({ where: { id }, data });
    }
    async delete(id) {
        await this.ndeyePrisma.user.delete({ where: { id } });
    }
    async findByLogin(login) {
        return this.ndeyePrisma.user.findUnique({ where: { login } });
    }
}
//# sourceMappingURL=UserRepository.js.map