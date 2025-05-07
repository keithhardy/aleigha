import { IAuthProvider } from "@/src/interfaces/auth-provider";
import { CreateUser, UpdateUser } from "@/src/schemas/auth";

export class AuthService {
  constructor(private readonly auth0Provider: IAuthProvider) {}

  createUser(input: CreateUser) {
    return this.auth0Provider.createUser(input);
  }

  getUserByEmail(email: string) {
    return this.auth0Provider.getUserByEmail(email);
  }

  updateUser(id: string, input: UpdateUser) {
    return this.auth0Provider.updateUser(id, input);
  }

  deleteUser(id: string) {
    return this.auth0Provider.deleteUser(id);
  }

  getCurrentUser() {
    return this.auth0Provider.getCurrentUser();
  }
}
