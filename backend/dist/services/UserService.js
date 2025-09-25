import { UserRepository } from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";
export class UserService {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }
    async findAll() {
        return this.userRepository.findAll();
    }
    async findById(id) {
        return this.userRepository.findById(id);
    }
    async create(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.userRepository.create({
            ...data,
            password: hashedPassword,
        });
    }
    async update(id, data) {
        let updatedData = { ...data };
        if (data.password) {
            updatedData.password = await bcrypt.hash(data.password, 10);
        }
        return this.userRepository.update(id, updatedData);
    }
    async delete(id) {
        return this.userRepository.delete(id);
    }
    async findByLogin(login) {
        return this.userRepository.findByLogin(login);
    }
}
//# sourceMappingURL=UserService.js.map