import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { UpdateContractorClientAndInstallationForm } from "./form";
import {
  Header,
  HeaderActions,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

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
    <>
      <Header>
        <HeaderGroup>
          <Heading>Details of the contractor, client and installation</Heading>
          <HeaderDescription>
            View the contractor and select the client and installation for this
            EICR report.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <UpdateContractorClientAndInstallationForm
        electricalInstallationConditionReport={
          electricalInstallationConditionReport as ElectricalInstallationConditionReport
        }
        clients={clients}
        settings={settings}
      />
    </>
  );
}
