import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db/prisma-client";

import { UpdateCurrentUsingEquipmentForm } from "./form";

export default async function UpdateCurrentUsingEquipment({
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
      item_8_1: true,
      item_8_2: true,
      item_8_3: true,
      item_8_4: true,
      item_8_5: true,
      item_8_6: true,
      item_8_7A: true,
      item_8_7B: true,
      item_8_7C: true,
      item_8_7D: true,
    },
  });

  if (!certificate) {
    notFound();
  }

  return (
    <UpdateCurrentUsingEquipmentForm
      certificate={certificate as ElectricalInstallationConditionReport}
    />
  );
}
