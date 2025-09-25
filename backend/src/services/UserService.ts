import { User } from "@prisma/client";
import { UserRepository } from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async create(data: Omit<User, "id">): Promise<User> {
    
    const hashedPassword = await bcrypt.hash(data.password, 10);  
    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  async update(id: number, data: Partial<Omit<User, "id">>): Promise<User> {
    let updatedData = { ...data };

    
    if (data.password) {
      updatedData.password = await bcrypt.hash(data.password, 10);
    }

    return this.userRepository.update(id, updatedData);
  }

  async delete(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.userRepository.findByLogin(login);
  }
}
