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
    const getOrderBy = () =>
      filters?.sorting?.map(({ id, desc }) => {
        const key = id.split(".").join(".");
        return { [key]: desc ? "desc" : "asc" };
      });

    const getRoleFilter = () => {
      const role = filters?.columnFilters?.find(
        (f) => f.id === "role" && Array.isArray(f.value) && f.value.length > 0,
      );
      return role ? { role: { in: role.value as $Enums.UserRole[] } } : {};
    };

    const getGlobalFilter = () => {
      if (!filters?.globalFilter) return {};
      const fields = ["name", "email", "phone"];
      return {
        OR: fields.map((field) => ({
          [field]: {
            contains: filters.globalFilter,
            mode: "insensitive",
          },
        })),
      };
    };

    const where = {
      ...getRoleFilter(),
      ...getGlobalFilter(),
    };

    const pagination = filters?.pagination
      ? {
          take: filters.pagination.pageSize,
          skip: filters.pagination.pageIndex * filters.pagination.pageSize,
        }
      : {};

    const orderBy = getOrderBy();

    return prisma.user.findMany({
      ...pagination,
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
