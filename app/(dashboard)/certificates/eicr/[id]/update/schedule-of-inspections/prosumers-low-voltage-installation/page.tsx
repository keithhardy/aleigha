import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { UpdateProsumersLowVoltageInstallationForm } from "./form";

export default async function UpdateProsumersLowVoltageInstallation({ params }: { params: Promise<{ id: string }> }) {
  const electricalInstallationConditionReport = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    select: {
      id: true,
      item_10_0: true,
    },
  });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return <UpdateProsumersLowVoltageInstallationForm electricalInstallationConditionReport={electricalInstallationConditionReport as ElectricalInstallationConditionReport} />;
}
