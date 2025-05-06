import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/prisma";

import { UpdateIntakeEquipmentForm } from "./form";

export default async function UpdateIntakeEquipment({
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
        item_1_1A: true,
        item_1_1B: true,
        item_1_1C: true,
        item_1_1D: true,
        item_1_1E: true,
        item_1_1F: true,
        item_1_2: true,
        item_1_3: true,
      },
    });

  if (!certificate) {
    notFound();
  }

  return (
    <UpdateIntakeEquipmentForm
      certificate={certificate as ElectricalInstallationConditionReport}
    />
  );
}
