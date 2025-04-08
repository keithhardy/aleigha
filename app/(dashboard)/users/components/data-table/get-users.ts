"use server";

import { prisma } from "@/lib/prisma";

export async function getUsers({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) {
  const [data, totalCount] = await Promise.all([
    prisma.user.findMany({
      skip: pageIndex * pageSize,
      take: pageSize,
    }),
    prisma.user.count(),
  ]);

  return {
    data,
    pageCount: Math.ceil(totalCount / pageSize),
  };
}
