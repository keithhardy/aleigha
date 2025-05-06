import { Auth0UserRepository } from "@/src/repositories/auth0-user-repository";
import { PrismaUserRepository } from "@/src/repositories/prisma-user-repository";
import { UserService } from "@/src/services/user-service";

export const userService = new UserService(
  new PrismaUserRepository(),
  new Auth0UserRepository(),
);
