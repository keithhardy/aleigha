import { Filters } from "@/app/strategies/users/components/table/useFilters";
import { CreateUser, UpdateUser, User, UserFacets } from "@/di/schemas/user";

export interface UserProvider {
  createUser(data: CreateUser): Promise<User>;
  getUser(id: string): Promise<User | null>;
  getUsers(filters?: Filters): Promise<User[]>;
  getFacets(filters?: Filters): Promise<UserFacets>;
  updateUser(id: string, data: UpdateUser): Promise<User>;
  deleteUser(id: string): Promise<User>;
}
