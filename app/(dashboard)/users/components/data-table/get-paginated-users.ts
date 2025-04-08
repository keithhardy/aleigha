"use server";

import { prisma } from "@/lib/prisma";

export async function getPaginatedUsers({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.user.count(),
  ]);

  return {
    users,
    totalCount,
  };
}
