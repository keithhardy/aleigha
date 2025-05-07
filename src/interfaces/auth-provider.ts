import { CreateUser, UpdateUser, User } from "@/src/schemas/auth";

export interface IAuthProvider {
  createUser(data: CreateUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, data: UpdateUser): Promise<User>;
  deleteUser(id: string): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
