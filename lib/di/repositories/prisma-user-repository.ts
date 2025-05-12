import { prisma } from "@/lib/db/prisma-client";
import { UserProvider } from "@/lib/di/interfaces/user-provider";
import { CreateUser, UpdateUser } from "@/lib/di/schemas/user";

export class PrismaUserRepository implements UserProvider {
  createUser(data: CreateUser) {
    return prisma.user.create({ data });
  }

  getUser(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  getUsers() {
    return prisma.user.findMany();
  }

  updateUser(id: string, data: UpdateUser) {
    return prisma.user.update({ where: { id }, data });
  }

  deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
