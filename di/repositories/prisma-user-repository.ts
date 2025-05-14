import { prisma } from "@/lib/db/prisma-client";
import { UserProvider } from "@/di/interfaces/user-provider";
import { CreateUser, UpdateUser } from "@/di/schemas/user";
import { Filters } from "@/app/strategies/users/components/table/useFilters";
import { $Enums } from "@prisma/client";

export class PrismaUserRepository implements UserProvider {
  createUser(data: CreateUser) {
    return prisma.user.create({ data });
  }

  getUser(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  getUsers(filters?: Filters) {
    const orderBy =
      filters?.sorting?.map((sort) => {
        const keys = sort.id.split(".");
        if (keys.length === 1) {
          return { [keys[0]]: sort.desc ? "desc" : "asc" };
        }
        return { [keys.join(".")]: sort.desc ? "desc" : "asc" };
      }) ?? undefined;

    const roleFilter = filters?.columnFilters?.find(
      (f) => f.id === "role" && Array.isArray(f.value) && f.value.length > 0,
    );

    const where = {
      ...(roleFilter
        ? {
            role: {
              in: roleFilter.value as $Enums.UserRole[],
            },
          }
        : {}),

      ...(filters?.globalFilter
        ? {
            OR: ["name", "email", "phone"].map((field) => ({
              [field]: {
                contains: filters.globalFilter,
                mode: "insensitive",
              },
            })),
          }
        : {}),
    };

    return prisma.user.findMany({
      ...(filters?.pagination && {
        take: filters.pagination.pageSize,
        skip: filters.pagination.pageIndex * filters.pagination.pageSize,
      }),
      ...(orderBy && { orderBy }),
      ...(Object.keys(where).length > 0 && { where }),
    });
  }

  updateUser(id: string, data: UpdateUser) {
    return prisma.user.update({ where: { id }, data });
  }

  deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
