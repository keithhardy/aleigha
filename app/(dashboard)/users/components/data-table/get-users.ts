"use server";

import { $Enums, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma-client";

type GetUsersProps = {
  take?: number;
  orderBy?: Prisma.UserOrderByWithRelationInput[];
  sortOrder?: "asc" | "desc";
  searchQuery?: string;
  roles?: $Enums.UserRole[];
};

export async function getUsers({
  take = 10,
  orderBy,
  searchQuery,
  roles,
}: GetUsersProps = {}) {
  const where = {
    ...(searchQuery && {
      OR: [
        { name: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
        {
          email: { contains: searchQuery, mode: Prisma.QueryMode.insensitive },
        },
        {
          phone: { contains: searchQuery, mode: Prisma.QueryMode.insensitive },
        },
      ],
    }),
    ...(roles?.length && { role: { in: roles } }),
  };

  const [users, totalCount, roleCountsRaw] = await Promise.all([
    prisma.user.findMany({
      take,
      orderBy,
      where,
    }),
    prisma.user.count({ where }),
    prisma.user.groupBy({
      by: ["role"],
      _count: { role: true },
      where,
    }),
  ]);

  const roleCounts =
    roleCountsRaw?.reduce(
      (acc, item) => {
        acc[item.role] = item._count.role;
        return acc;
      },
      {} as Record<$Enums.UserRole, number>,
    ) ?? {};

  return {
    users,
    totalCount,
    roleCounts,
  };
}
