import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db/prisma-client";

import { UpdateProsumersLowVoltageInstallationForm } from "./form";

export default async function UpdateProsumersLowVoltageInstallation({
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
      item_10_0: true,
    },
  });

  if (!certificate) {
    notFound();
  }

  return (
    <UpdateProsumersLowVoltageInstallationForm
      certificate={certificate as ElectricalInstallationConditionReport}
    />
  );
}
