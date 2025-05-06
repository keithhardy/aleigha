import { PrismaUserRepository } from "@/lib/repositories/prisma-user-repository";
import { UserService } from "@/lib/services/user-service";

export const userService = new UserService(new PrismaUserRepository());
