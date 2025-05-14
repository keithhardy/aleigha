import { prisma } from "@/lib/db/prisma-client";
import { UserProvider } from "@/di/interfaces/user-provider";
import { CreateUser, UpdateUser } from "@/di/schemas/user";
import { Filters } from "@/app/strategies/users/components/table/useFilters";
import { toPrismaWhere } from "./mappers/to-prisma-where";
import { toPrismaOrderBy } from "./mappers/to-prisma-order-by";
import { toPrismaSkip } from "./mappers/to-prisma-skip";
import { toPrismaTake } from "./mappers/to-prisma-take";

export class PrismaUserRepository implements UserProvider {
  createUser(data: CreateUser) {
    return prisma.user.create({ data });
  }

  getUser(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  getUsers(filters?: Filters) {
    return prisma.user.findMany({
      where: toPrismaWhere(filters, ["name", "email", "phone"]),
      orderBy: toPrismaOrderBy(filters?.sorting),
      take: toPrismaTake(filters?.pagination),
      skip: toPrismaSkip(filters?.pagination),
    });
  }

  updateUser(id: string, data: UpdateUser) {
    return prisma.user.update({ where: { id }, data });
  }

  deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
