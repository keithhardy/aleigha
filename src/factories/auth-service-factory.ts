import { Auth0AuthRepository } from "@/src/repositories/auth0-auth-repository";
import { AuthService } from "@/src/services/auth-service";

export const authService = new AuthService(new Auth0AuthRepository());
