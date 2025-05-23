import { notFound } from "next/navigation";

import { prisma } from "@/lib/db/prisma-client";

import { UpdateContractorClientAndInstallationForm } from "./form";

export default async function UpdateContractorClientAndInstallation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const certificate = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    select: {
      id: true,
      clientId: true,
      propertyId: true,
    },
  });

  if (!certificate) {
    notFound();
  }

  const clients = await prisma.client.findMany({
    include: {
      address: true,
      property: {
        include: {
          address: true,
        },
      },
    },
  });

  const settings = await prisma.settings.findFirst({
    include: {
      address: true,
    },
  });

  return (
    <UpdateContractorClientAndInstallationForm
      certificate={certificate}
      clients={clients}
      settings={settings}
    />
  );
}
