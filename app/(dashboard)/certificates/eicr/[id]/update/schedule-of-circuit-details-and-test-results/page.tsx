import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/prisma/prisma";

import { UpdateScheduleOfCircuitDetailsAndTestResultsForm } from "./form";

export default async function UpdateScheduleOfCircuitDetailsAndTestResults({
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
        consumerUnits: true,
      },
    });

  if (!certificate) {
    notFound();
  }

  return (
    <UpdateScheduleOfCircuitDetailsAndTestResultsForm
      certificate={certificate as ElectricalInstallationConditionReport}
    />
  );
}
