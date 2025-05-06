import { IUserProvider } from "@/lib/interfaces/user-provider";
import { CreateUserDto, UpdateUserDto } from "@/lib/schemas/user";
import { prisma } from "@/prisma";

export class PrismaUserRepository implements IUserProvider {
  async createUser(data: CreateUserDto) {
    return prisma.user.create({ data });
  }

  async getUser(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async getUsers() {
    return prisma.user.findMany();
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
