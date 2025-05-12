import { Auth0AuthRepository } from "@/lib/di/repositories/auth0-auth-repository";
import { PrismaUserRepository } from "@/lib/di/repositories/prisma-user-repository";
import { UserService } from "@/lib/di/services/user-service";

export const userService = new UserService(
  new PrismaUserRepository(),
  new Auth0AuthRepository(),
);
