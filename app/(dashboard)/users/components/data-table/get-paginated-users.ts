"use server";

import { prisma } from "@/lib/prisma";

export async function getPaginatedUsers({
  page,
  pageSize,
  sortBy,
  sortOrder,
}: {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: sortBy
        ? {
            [sortBy]: sortOrder || "asc",
          }
        : undefined,
    }),
    prisma.user.count(),
  ]);

  return {
    users,
    totalCount,
  };
}
