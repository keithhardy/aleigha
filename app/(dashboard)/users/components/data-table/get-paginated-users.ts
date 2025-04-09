"use server";

import { $Enums, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function getPaginatedUsers({
  page,
  pageSize,
  sortBy = "name",
  sortOrder = "asc",
  searchQuery,
  roles,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchQuery?: string;
  roles?: $Enums.UserRole[];
}) {
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

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        [sortBy]: sortOrder,
      },
      where,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    totalCount,
  };
}
