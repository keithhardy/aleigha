"use server";

import { $Enums, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma-client";

type GetUsersProps = {
  take: number;
  skip: number;
  orderBy?: Prisma.UserOrderByWithRelationInput[];
  sortOrder?: "asc" | "desc";
  searchQuery?: string;
  roles?: $Enums.UserRole[];
};

export async function getUsers({
  take,
  skip,
  orderBy,
  searchQuery,
  roles,
}: GetUsersProps) {
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

  const [users, totalCount, roleFacets] = await Promise.all([
    prisma.user.findMany({
      take,
      skip,
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

  const facetedUniqueValues = {
    role: roleFacets.reduce(
      (acc, cur) => {
        acc[cur.role] = cur._count.role;
        return acc;
      },
      {} as Record<string, number>,
    ),
  };

  return {
    users,
    totalCount,
    roleFacets,
    facetedUniqueValues,
  };
}
