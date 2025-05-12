import { CreateUser, UpdateUser, User } from "@/di/schemas/auth";

export interface AuthProvider {
  createUser(data: CreateUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, data: UpdateUser): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
