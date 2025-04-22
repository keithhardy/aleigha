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
  const searchFilter = searchQuery
    ? {
      OR: [
        { name: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
        { email: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
        { phone: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
      ],
    }
    : {};

  const where = {
    ...searchFilter,
    ...(roles?.length ? { role: { in: roles } } : {}),
  };

  const [users, totalCount, roleFacets] = await Promise.all([
    prisma.user.findMany({ take, skip, orderBy, where }),
    prisma.user.count({ where }),
    prisma.user.groupBy({
      by: ["role"],
      _count: { role: true },
      where: searchFilter,
    }),
  ]);

  const roleCounts: Record<string, number> = {};

  roleFacets.forEach((facet) => {
    roleCounts[facet.role] = facet._count.role;
  });

  if (roles?.length) {
    for (const role of roles) {
      if (!(role in roleCounts)) {
        roleCounts[role] = 0;
      }
    }
  }

  const facetedUniqueValues = {
    role: roleCounts,
  };

  return {
    users,
    totalCount,
    facetedUniqueValues,
  };
}

