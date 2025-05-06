"use server";

import { EICRStatus, Prisma } from "@prisma/client";

import { prisma } from "@/prisma/prisma";

type GetCertificatesProps = {
  take: number;
  skip: number;
  orderBy?: Prisma.ElectricalInstallationConditionReportOrderByWithRelationInput[];
  searchQuery?: string;
  filters?: { id: string; value: unknown }[];
};

export async function getCertificates({
  take,
  skip,
  orderBy,
  searchQuery,
  filters = [],
}: GetCertificatesProps) {
  const baseSearchFilter: Prisma.ElectricalInstallationConditionReportWhereInput =
    searchQuery
      ? {
          OR: [
            {
              serial: {
                contains: searchQuery,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              property: {
                address: {
                  streetAddress: {
                    contains: searchQuery,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              },
            },
            {
              property: {
                address: {
                  postCode: {
                    contains: searchQuery,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              },
            },
          ],
        }
      : {};

  const buildWhere = (
    excludeKey?: string,
  ): Prisma.ElectricalInstallationConditionReportWhereInput => {
    const filterConditions: Prisma.ElectricalInstallationConditionReportWhereInput =
      filters.reduce((acc, filter) => {
        if (filter.id === excludeKey) return acc;

        if (filter.id === "type" && Array.isArray(filter.value)) {
          acc.type = { in: filter.value as string[] };
        }

        if (filter.id === "status" && Array.isArray(filter.value)) {
          acc.status = { in: filter.value as EICRStatus[] };
        }

        if (filter.id === "client.name" && Array.isArray(filter.value)) {
          acc.client = { name: { in: filter.value as string[] } };
        }

        if (
          filter.id === "startDate" &&
          typeof filter.value === "object" &&
          filter.value !== null
        ) {
          const { from, to } = filter.value as { from?: Date; to?: Date };
          acc.createdAt = {
            ...(from && { gte: from }),
            ...(to && {
              lt: new Date(new Date(to).setDate(new Date(to).getDate() + 1)), // add 1 day
            }),
          };
        }

        return acc;
      }, {} as Prisma.ElectricalInstallationConditionReportWhereInput);

    return {
      ...baseSearchFilter,
      ...filterConditions,
    };
  };

  const where = buildWhere();

  const [data, total, clientFacets, typeFacets, statusFacets] =
    await Promise.all([
      prisma.electricalInstallationConditionReport.findMany({
        take,
        skip,
        orderBy,
        where,
        include: {
          client: true,
          property: {
            include: {
              address: true,
            },
          },
        },
      }),

      prisma.electricalInstallationConditionReport.count({ where }),

      prisma.electricalInstallationConditionReport
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

      prisma.electricalInstallationConditionReport.groupBy({
        by: ["type"],
        _count: { type: true },
        where: buildWhere("type"),
      }),

      prisma.electricalInstallationConditionReport.groupBy({
        by: ["status"],
        _count: { status: true },
        where: buildWhere("status"),
      }),
    ]);

  const clientNameCounts: Record<string, number> = {};
  clientFacets.forEach((facet) => {
    if (facet.name) {
      clientNameCounts[facet.name] = facet.count;
    }
  });

  const typeNameCounts: Record<string, number> = {};
  typeFacets.forEach((facet) => {
    if (facet.type) {
      typeNameCounts[facet.type] = facet._count.type;
    }
  });

  const statusNameCounts: Record<string, number> = {};
  statusFacets.forEach((facet) => {
    if (facet.status) {
      statusNameCounts[facet.status] = facet._count.status;
    }
  });

  return {
    data,
    total,
    facets: {
      client: clientNameCounts,
      type: typeNameCounts,
      status: statusNameCounts,
    },
  };
}
