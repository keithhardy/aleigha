import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/prisma";

import { UpdateScheduleOfRatesForm } from "./form";

export default async function UpdateScheduleOfRates({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const certificate =
    await prisma.electricalInstallationConditionReport.findFirst({
      where: {
        id: (await params).id,
      },
      select: {
        id: true,
        rates: true,
      },
    });

  if (!certificate) {
    notFound();
  }

  return (
    <UpdateScheduleOfRatesForm
      certificate={certificate as ElectricalInstallationConditionReport}
    />
  );
}
