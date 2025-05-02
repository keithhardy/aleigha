"use server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db/prisma-client";

type GetClientsProps = {
  take: number;
  skip: number;
  orderBy?: Prisma.ClientOrderByWithRelationInput[];
  searchQuery?: string;
  filters?: { id: string; value: unknown }[];
};

export async function getClients({
  take,
  skip,
  orderBy,
  searchQuery,
}: GetClientsProps) {
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
          {
            appointedPerson: {
              contains: searchQuery,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }
    : {};

  const where = {
    ...baseSearchFilter,
  };

  const [data, total] = await Promise.all([
    prisma.client.findMany({ take, skip, orderBy, where }),
    prisma.client.count({ where }),
  ]);

  return {
    data,
    total,
    facets: {},
  };
}
