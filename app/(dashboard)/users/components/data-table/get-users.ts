"use server";

import { $Enums, Prisma } from "@prisma/client";

import { prisma } from "@/prisma";

type GetUsersProps = {
  take: number;
  skip: number;
  orderBy?: Prisma.UserOrderByWithRelationInput[];
  searchQuery?: string;
  filters?: { id: string; value: unknown }[];
};

export async function getUsers({
  take,
  skip,
  orderBy,
  searchQuery,
  filters = [],
}: GetUsersProps) {
  const baseSearchFilter = searchQuery
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

  const buildWhere = (excludeKey?: string): Prisma.UserWhereInput => {
    const filterConditions: Prisma.UserWhereInput = filters.reduce(
      (acc, filter) => {
        if (filter.id === excludeKey) return acc;

        if (filter.id === "role" && Array.isArray(filter.value)) {
          acc.role = { in: filter.value as $Enums.UserRole[] };
        }

        return acc;
      },
      {} as Prisma.UserWhereInput,
    );

    return {
      ...baseSearchFilter,
      ...filterConditions,
    };
  };

  const where = buildWhere();

  const [data, total, roleFacets] = await Promise.all([
    prisma.user.findMany({ take, skip, orderBy, where }),

    prisma.user.count({ where }),

    prisma.user.groupBy({
      by: ["role"],
      _count: { role: true },
      where: buildWhere("role"),
    }),
  ]);

  const roleCounts: Record<string, number> = {};
  roleFacets.forEach((facet) => {
    roleCounts[facet.role] = facet._count.role;
  });

  return {
    data,
    total,
    facets: {
      role: roleCounts,
    },
  };
}
