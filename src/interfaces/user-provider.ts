import { CreateUser, UpdateUser, User } from "@/src/schemas/user";

export interface IUserProvider {
  createUser(data: CreateUser): Promise<User>;
  getUser(id: string): Promise<User | null>;
  getUsers(): Promise<User[]>;
  updateUser(id: string, data: UpdateUser): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
