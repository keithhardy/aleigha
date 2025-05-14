import { prisma } from "@/lib/db/prisma-client";
import { UserProvider } from "@/di/interfaces/user-provider";
import { CreateUser, UpdateUser } from "@/di/schemas/user";
import { Filters } from "@/app/strategies/users/components/table/useFilters";

export class PrismaUserRepository implements UserProvider {
  createUser(data: CreateUser) {
    return prisma.user.create({ data });
  }

  getUser(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  getUsers(filters?: Filters) {
    const globalFilter = ["name", "email", "phone"];

    const where = {
      ...(filters?.columnFilters?.reduce(
        (acc, filter) => {
          if (Array.isArray(filter.value) && filter.value.length > 0) {
            return {
              ...acc,
              [filter.id]: { in: filter.value },
            };
          }
          return acc;
        },
        {} as Record<string, any>,
      ) ?? {}),

      ...(filters?.globalFilter
        ? {
            OR: globalFilter.map((field) => ({
              [field]: {
                contains: filters.globalFilter,
                mode: "insensitive",
              },
            })),
          }
        : {}),
    };

    const orderBy =
      filters?.sorting?.map((sort) => {
        const keys = sort.id.split(".");
        if (keys.length === 1) {
          return { [keys[0]]: sort.desc ? "desc" : "asc" };
        }
        return { [keys.join(".")]: sort.desc ? "desc" : "asc" };
      }) ?? undefined;

    const take = filters?.pagination?.pageSize;

    const skip = filters?.pagination
      ? filters.pagination.pageIndex * filters.pagination.pageSize
      : undefined;

    return prisma.user.findMany({
      where,
      orderBy,
      take,
      skip,
    });
  }

  updateUser(id: string, data: UpdateUser) {
    return prisma.user.update({ where: { id }, data });
  }

  deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
