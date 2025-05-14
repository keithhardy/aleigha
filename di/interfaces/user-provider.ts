import { Filters } from "@/app/strategies/users/components/table/useFilters";
import { CreateUser, UpdateUser, User, UserFacets, UserTotal } from "@/di/schemas/user";

export interface UserProvider {
  createUser(data: CreateUser): Promise<User>;
  getUser(id: string): Promise<User | null>;
  getUsers(filters?: Filters): Promise<User[]>;
  getFacets(filters?: Filters): Promise<UserFacets>;
  getTotal(filters?: Filters): Promise<UserTotal>;
  updateUser(id: string, data: UpdateUser): Promise<User>;
  deleteUser(id: string): Promise<User>;
}
