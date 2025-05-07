import { IAuthProvider } from "@/src/interfaces/auth-provider";
import { CreateUser, UpdateUser } from "@/src/schemas/auth";

export class AuthService {
  constructor(private readonly authProvider: IAuthProvider) {}

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

  getCurrentUser() {
    return this.authProvider.getCurrentUser();
  }
}
