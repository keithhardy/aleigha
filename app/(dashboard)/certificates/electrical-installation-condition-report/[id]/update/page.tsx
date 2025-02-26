import { notFound } from "next/navigation";

import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";

import { UpdateElectricalInstallationConditionReportForm } from "./form";

export default async function UpdateElectricalInstallationConditionReport({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const electricalInstallationConditionReport =
    await prisma.electricalInstallationConditionReport.findFirst({
      where: {
        id: (await params).id,
      },
    });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  const clients = await prisma.client.findMany({
    include: {
      property: {
        include: {
          address: true,
        },
      },
    },
  });

  return (
    <div className="container mx-auto max-w-screen-md">
      <Header>
        <HeaderGroup>
          <Heading>Update Electrical Installation Condition Report</Heading>
          <HeaderDescription>
            Fill in the details below to update a new Electrical Installation
            Condition Report (EICR).
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <UpdateElectricalInstallationConditionReportForm
        electricalInstallationConditionReport={
          electricalInstallationConditionReport!
        }
        clients={clients}
      />
    </div>
  );
}
