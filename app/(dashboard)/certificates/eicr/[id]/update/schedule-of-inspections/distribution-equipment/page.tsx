import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma-client";

import { UpdateDistributionEquipmentForm } from "./form";

export default async function UpdateDistributionEquipment({ params }: { params: Promise<{ id: string }> }) {
  const certificate = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    select: {
      id: true,
      item_4_1: true,
      item_4_2: true,
      item_4_3: true,
      item_4_4: true,
      item_4_5: true,
      item_4_6: true,
      item_4_7: true,
      item_4_8: true,
      item_4_9: true,
      item_4_10: true,
      item_4_11: true,
      item_4_12: true,
      item_4_13: true,
      item_4_14: true,
      item_4_15: true,
      item_4_16: true,
      item_4_17: true,
      item_4_18: true,
      item_4_19: true,
      item_4_20: true,
      item_4_21: true,
      item_4_22: true,
      item_4_23: true,
      item_4_24: true,
      item_4_25: true,
    },
  });

  if (!certificate) {
    notFound();
  }

  return <UpdateDistributionEquipmentForm certificate={certificate as ElectricalInstallationConditionReport} />;
}
