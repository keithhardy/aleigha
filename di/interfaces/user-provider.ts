import { Filters } from "@/app/strategies/users/components/table/useFilters";
import { CreateUser, UpdateUser, User } from "@/di/schemas/user";

export interface UserProvider {
  createUser(data: CreateUser): Promise<User>;
  getUser(id: string): Promise<User | null>;
  getUsers(filters?: Filters): Promise<User[]>;
  updateUser(id: string, data: UpdateUser): Promise<User>;
  deleteUser(id: string): Promise<User>;
}
