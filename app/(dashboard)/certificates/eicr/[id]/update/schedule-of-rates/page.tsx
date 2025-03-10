import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { UpdateScheduleOfRatesForm } from "./form";

export default async function UpdateScheduleOfRates({
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
        rates: true,
      },
    });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return (
    <UpdateScheduleOfRatesForm
      electricalInstallationConditionReport={
        electricalInstallationConditionReport as ElectricalInstallationConditionReport
      }
    />
  );
}
