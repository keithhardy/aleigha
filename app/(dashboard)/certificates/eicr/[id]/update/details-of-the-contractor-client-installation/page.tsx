import { notFound } from "next/navigation";

import {
  Header,
  HeaderActions,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { prisma } from "@/lib/prisma";

import { UpdateContractorClientAndInstallationForm } from "./form";
import { Button } from "@/components/ui/button";

export default async function UpdateContractorClientAndInstallation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const electricalInstallationConditionReport =
    await prisma.electricalInstallationConditionReport.findFirst({
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

  return (
    <div className="container mx-auto max-w-screen-lg px-6">
      <Header>
        <HeaderGroup>
          <Heading>Contractor, Client and Installation</Heading>
          <HeaderDescription>
            View the contractor and select the client and installation for this
            EICR report.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <UpdateContractorClientAndInstallationForm
        electricalInstallationConditionReport={
          electricalInstallationConditionReport
        }
        clients={clients}
        settings={settings}
      />
    </div>
  );
}
