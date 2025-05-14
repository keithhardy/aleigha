import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db/prisma-client";

import { UpdateSpecialLocationsAndInstallationsForm } from "./form";

export default async function UpdateSpecialLocationsAndInstallations({
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
      item_9_1A: true,
      item_9_1B: true,
      item_9_1C: true,
      item_9_1D: true,
      item_9_1E: true,
      item_9_1F: true,
      item_9_1G: true,
      item_9_1H: true,
      item_9_2: true,
    },
  });

  if (!certificate) {
    notFound();
  }

  return (
    <UpdateSpecialLocationsAndInstallationsForm
      certificate={certificate as ElectricalInstallationConditionReport}
    />
  );
}
