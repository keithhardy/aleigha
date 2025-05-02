import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db/prisma-client";

import { UpdateMethodsOfProtectionForm } from "./form";

export default async function UpdateScheduleOfItemsInspected({ params }: { params: Promise<{ id: string }> }) {
  const certificate = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    select: {
      id: true,
      item_3_1A: true,
      item_3_1B: true,
      item_3_1C: true,
      item_3_1D: true,
      item_3_1E: true,
      item_3_1F: true,
      item_3_1G: true,
      item_3_1H: true,
      item_3_1I: true,
      item_3_2: true,
      item_3_3A: true,
      item_3_3B: true,
      item_3_3C: true,
      item_3_3D: true,
      item_3_3E: true,
      item_3_3F: true,
    },
  });

  if (!certificate) {
    notFound();
  }

  return <UpdateMethodsOfProtectionForm certificate={certificate as ElectricalInstallationConditionReport} />;
}
