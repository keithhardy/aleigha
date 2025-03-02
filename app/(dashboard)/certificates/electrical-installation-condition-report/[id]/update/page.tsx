import { notFound } from "next/navigation";

import { Header, HeaderGroup, Heading } from "@/components/page-header";

import { UpdateContractorClientPropertyForm } from "./contractor-client-property/form";

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

  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Contractor Client and Property</Heading>
        </HeaderGroup>
      </Header>

      <UpdateContractorClientPropertyForm electricalInstallationConditionReport={electricalInstallationConditionReport} clients={clients} settings={settings} />
    </div>
  );
}
