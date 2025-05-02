"use server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db/prisma-client";

type GetPropertiesProps = {
  take: number;
  skip: number;
  orderBy?: Prisma.PropertyOrderByWithRelationInput[];
  searchQuery?: string;
  filters?: { id: string; value: unknown }[];
};

export async function getProperties({
  take,
  skip,
  orderBy,
  searchQuery,
  filters = [],
}: GetPropertiesProps) {
  const baseSearchFilter: Prisma.PropertyWhereInput = searchQuery
    ? {
        OR: [
          {
            uprn: { contains: searchQuery, mode: Prisma.QueryMode.insensitive },
          },
          {
            address: {
              streetAddress: {
                contains: searchQuery,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
          {
            address: {
              postCode: {
                contains: searchQuery,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
        ],
      }
    : {};

  const buildWhere = (excludeKey?: string): Prisma.PropertyWhereInput => {
    const filterConditions: Prisma.PropertyWhereInput = filters.reduce(
      (acc, filter) => {
        if (filter.id === excludeKey) return acc;

        if (filter.id === "occupier" && Array.isArray(filter.value)) {
          acc.occupier = { in: filter.value as string[] };
        }

        if (filter.id === "client.name" && Array.isArray(filter.value)) {
          acc.client = { name: { in: filter.value as string[] } };
        }

        return acc;
      },
      {} as Prisma.PropertyWhereInput,
    );

    return {
      ...baseSearchFilter,
      ...filterConditions,
    };
  };

  const where = buildWhere();

  const [data, total, occupierFacets, clientFacets] = await Promise.all([
    prisma.property.findMany({
      take,
      skip,
      orderBy,
      where,
      include: {
        address: true,
        client: true,
      },
    }),

    prisma.property.count({ where }),

    prisma.property.groupBy({
      by: ["occupier"],
      _count: { occupier: true },
      where: buildWhere("occupier"),
    }),

    prisma.property
      .groupBy({
        by: ["clientId"],
        _count: { clientId: true },
        where: buildWhere("client.name"),
      })
      .then(async (groups) => {
        const clients = await prisma.client.findMany({
          where: {
            id: { in: groups.map((g) => g.clientId) },
          },
          select: { id: true, name: true },
        });
        const clientMap = Object.fromEntries(
          clients.map((c) => [c.id, c.name]),
        );
        return groups.map((g) => ({
          name: clientMap[g.clientId] || "Unknown",
          count: g._count.clientId,
        }));
      }),
  ]);

  const occupierCounts: Record<string, number> = {};
  occupierFacets.forEach((facet) => {
    if (facet.occupier) {
      occupierCounts[facet.occupier] = facet._count.occupier;
    }
  });

  const clientNameCounts: Record<string, number> = {};
  clientFacets.forEach((facet) => {
    if (facet.name) {
      clientNameCounts[facet.name] = facet.count;
    }
  });

  return {
    data,
    total,
    facets: {
      occupier: occupierCounts,
      client: clientNameCounts,
    },
  };
}
