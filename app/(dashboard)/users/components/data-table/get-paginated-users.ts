"use server";

import { prisma } from "@/lib/prisma";

export async function getPaginatedUsers({
  page,
  pageSize,
  sortBy,
  sortOrder,
  searchQuery,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchQuery?: string;
}) {
  const where = searchQuery
    ? {
        OR: [
          { name: { contains: searchQuery } },
          { email: { contains: searchQuery } },
          { phone: { contains: searchQuery } },
        ],
      }
    : undefined;

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: sortBy
        ? {
            [sortBy]: sortOrder || "asc",
          }
        : undefined,
      where,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    totalCount,
  };
}
