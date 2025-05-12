import { Auth0AuthRepository } from "@/lib/di/repositories/auth0-auth-repository";
import { AuthService } from "@/lib/di/services/auth-service";

export const authService = new AuthService(new Auth0AuthRepository());
