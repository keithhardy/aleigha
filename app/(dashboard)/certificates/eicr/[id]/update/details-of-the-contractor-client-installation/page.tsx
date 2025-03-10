import { notFound } from "next/navigation";

import { UpdateContractorClientAndInstallationForm } from "./form";

export default async function UpdateContractorClientAndInstallation({ params }: { params: Promise<{ id: string }> }) {
  const electricalInstallationConditionReport = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    select: {
      id: true,
      clientId: true,
      propertyId: true,
      client: {
        select: {
          id: true,
          address: true,
        },
      },
      property: {
        select: {
          address: true,
        },
      },
    },
  });

  if (!electricalInstallationConditionReport) {
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

  console.log(electricalInstallationConditionReport)

  return <UpdateContractorClientAndInstallationForm electricalInstallationConditionReport={electricalInstallationConditionReport} clients={clients} settings={settings} />;
}
