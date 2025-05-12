import { Auth0AuthRepository } from "@/di/repositories/auth0-auth-repository";
import { AuthService } from "@/di/services/auth-service";

export const authService = new AuthService(new Auth0AuthRepository());
