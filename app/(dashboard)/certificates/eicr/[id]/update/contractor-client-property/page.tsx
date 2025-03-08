import { notFound } from "next/navigation";

import { UpdateContractorClientPropertyForm } from "./form";

export default async function UpdateElectricalInstallationConditionReport({ params }: { params: Promise<{ id: string }> }) {
  const electricalInstallationConditionReport = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    include: {
      client: {
        include: {
          address: true,
        },
      },
      property: {
        include: {
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

  return <UpdateContractorClientPropertyForm electricalInstallationConditionReport={electricalInstallationConditionReport} clients={clients} settings={settings} />;
}
