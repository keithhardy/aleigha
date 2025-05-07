import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/prisma";

import { UpdateObservationsForm } from "./form";

export default async function UpdateObservations({
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
        observations: true,
      },
    });

  if (!certificate) {
    notFound();
  }

  return (
    <UpdateObservationsForm
      certificate={certificate as ElectricalInstallationConditionReport}
    />
  );
}
