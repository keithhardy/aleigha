import { notFound } from "next/navigation";

import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { prisma } from "@/lib/prisma";

import { DeleteElectricalInstallationConditionReportForm } from "./form";

export default async function DeleteElectricalInstallationConditionReport({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const electricalInstallationConditionReport =
    await prisma.electricalInstallationConditionReport.findFirst({
      where: {
        id: (await params).id,
      },
      include: {
        creator: {
          select: {
            name: true,
          },
        },
        client: {
          select: {
            name: true,
          },
        },
        property: {
          select: {
            uprn: true,
            address: {
              select: {
                streetAddress: true,
                postCode: true,
              },
            },
          },
        },
      },
    });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>Delete Electrical Installation Condition Report</Heading>
          <HeaderDescription>
            Are you sure you want to delete{" "}
            {electricalInstallationConditionReport.serial}? This action cannot
            be undone.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <DeleteElectricalInstallationConditionReportForm
        electricalInstallationConditionReport={
          electricalInstallationConditionReport!
        }
      />
    </>
  );
}
