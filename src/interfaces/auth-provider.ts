import { CreateUser, UpdateUser, User, CurrentUser } from "@/src/schemas/auth";

export interface IAuthProvider {
  createUser(data: CreateUser): Promise<User>;
  getUser(auth0Id: string): Promise<User | null>;
  updateUser(auth0Id: string, data: UpdateUser): Promise<User>;
  deleteUser(auth0Id: string): Promise<void>;
  getCurrentUser(): Promise<CurrentUser | null>;
}
