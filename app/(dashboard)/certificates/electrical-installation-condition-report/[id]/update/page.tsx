import { notFound } from "next/navigation";

import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";

import { UpdateContractorClientPropertyForm } from "./contractor-client-property/form";

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
    <div className="container mx-auto max-w-screen-lg">
      <UpdateContractorClientPropertyForm
        electricalInstallationConditionReport={
          electricalInstallationConditionReport
        }
        clients={clients}
      />
    </div>
  );
}
