import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db/prisma-client";

import { UpdateIsolationAndSwitchingForm } from "./form";

export default async function UpdateIsolationAndSwitching({ params }: { params: Promise<{ id: string }> }) {
  const certificate = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    select: {
      id: true,
      item_7_1A: true,
      item_7_1B: true,
      item_7_1C: true,
      item_7_1D: true,
      item_7_1E: true,
      item_7_1F: true,
      item_7_2A: true,
      item_7_2B: true,
      item_7_2C: true,
      item_7_2D: true,
      item_7_3A: true,
      item_7_3B: true,
      item_7_3C: true,
      item_7_3D: true,
      item_7_4A: true,
      item_7_4B: true,
    },
  });

  if (!certificate) {
    notFound();
  }

  return <UpdateIsolationAndSwitchingForm certificate={certificate as ElectricalInstallationConditionReport} />;
}
