import { prisma } from "@/prisma";
import { IUserProvider } from "@/src/interfaces/user-provider";
import { CreateUser, UpdateUser } from "@/src/schemas/user";

export class PrismaUserRepository implements IUserProvider {
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
