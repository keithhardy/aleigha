import { notFound } from "next/navigation";

import { UpdateDistributionCircuitsForm } from "./form";

export default async function UpdateDistributionCircuits({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const electricalInstallationConditionReport =
    await prisma.electricalInstallationConditionReport.findFirst({
      where: {
        id: (await params).id,
      },
      select: {
        id: true,
        item_5_1: true,
        item_5_2: true,
        item_5_3: true,
        item_5_4: true,
        item_5_5: true,
        item_5_6: true,
        item_5_7: true,
        item_5_8: true,
        item_5_9: true,
        item_5_10: true,
        item_5_11: true,
        item_5_12: true,
        item_5_13: true,
        item_5_14A: true,
        item_5_14B: true,
        item_5_15: true,
        item_5_16: true,
        item_5_17: true,
        item_5_18: true,
        item_5_19: true,
        item_5_20: true,
        item_5_21: true,
        item_5_22: true,
        item_5_23: true,
        item_5_24: true,
      },
    });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return (
    <UpdateDistributionCircuitsForm
      electricalInstallationConditionReport={
        electricalInstallationConditionReport
      }
    />
  );
}
