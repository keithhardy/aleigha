import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db/prisma-client";

import { UpdateFinalCircuitsForm } from "./form";

export default async function UpdateFinalCircuits({ params }: { params: Promise<{ id: string }> }) {
  const certificate = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    select: {
      id: true,
      item_6_1: true,
      item_6_2: true,
      item_6_3: true,
      item_6_4: true,
      item_6_5: true,
      item_6_6: true,
      item_6_7: true,
      item_6_8: true,
      item_6_9: true,
      item_6_10: true,
      item_6_11: true,
      item_6_12A: true,
      item_6_12B: true,
      item_6_13A: true,
      item_6_13B: true,
      item_6_13C: true,
      item_6_13D: true,
      item_6_13E: true,
      item_6_14: true,
      item_6_15: true,
      item_6_16: true,
      item_6_17A: true,
      item_6_17B: true,
      item_6_17C: true,
      item_6_17D: true,
      item_6_18: true,
      item_6_19: true,
      item_6_20: true,
    },
  });

  if (!certificate) {
    notFound();
  }

  return (
    <UpdateFinalCircuitsForm certificate={certificate as ElectricalInstallationConditionReport} />
  );
}
