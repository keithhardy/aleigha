import { Auth0AuthRepository } from "@/di/repositories/auth0-auth-repository";
import { PrismaUserRepository } from "@/di/repositories/prisma-user-repository";
import { UserService } from "@/di/services/user-service";

export const userService = new UserService(
  new PrismaUserRepository(),
  new Auth0AuthRepository(),
);
