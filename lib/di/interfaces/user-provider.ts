import { CreateUser, UpdateUser, User } from "@/lib/di/schemas/user";

export interface UserProvider {
  createUser(data: CreateUser): Promise<User>;
  getUser(id: string): Promise<User | null>;
  getUsers(): Promise<User[]>;
  updateUser(id: string, data: UpdateUser): Promise<User>;
  deleteUser(id: string): Promise<User>;
}
