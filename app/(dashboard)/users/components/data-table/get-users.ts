"use server";

import { $Enums, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma-client";

type GetUsersProps = {
  take: number;
  skip: number;
  orderBy?: Prisma.UserOrderByWithRelationInput[];
  searchQuery?: string;
  filters?: { id: string; value: unknown }[];
};

type FilterConditions = {
  role?: { in: $Enums.UserRole[] };
};

export async function getUsers({
  take,
  skip,
  orderBy,
  searchQuery,
  filters = [],
}: GetUsersProps) {
  const searchFilter = searchQuery
    ? {
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            email: {
              contains: searchQuery,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            phone: {
              contains: searchQuery,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }
    : {};

  const filterConditions: FilterConditions = filters.reduce<FilterConditions>(
    (acc, filter) => {
      if (filter.id === "role" && Array.isArray(filter.value)) {
        acc.role = { in: filter.value as $Enums.UserRole[] };
      }
      return acc;
    },
    {},
  );

  const where = {
    ...searchFilter,
    ...filterConditions,
  };

  const [data, total, roleFacets] = await Promise.all([
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

  if (filterConditions.role?.in?.length) {
    for (const role of filterConditions.role.in) {
      if (!(role in roleCounts)) {
        roleCounts[role] = 0;
      }
    }
  }

  return {
    data,
    total,
    facets: {
      role: roleCounts,
    },
  };
}
