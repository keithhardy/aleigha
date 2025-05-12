import { AuthProvider } from "@/lib/di/interfaces/auth-provider";
import { CreateUser, UpdateUser } from "@/lib/di/schemas/auth";

export class AuthService {
  constructor(private readonly authProvider: AuthProvider) {}

  createUser(input: CreateUser) {
    return this.authProvider.createUser(input);
  }

  getUserByEmail(email: string) {
    return this.authProvider.getUserByEmail(email);
  }

  updateUser(id: string, input: UpdateUser) {
    return this.authProvider.updateUser(id, input);
  }

  deleteUser(id: string) {
    return this.authProvider.deleteUser(id);
  }
}
