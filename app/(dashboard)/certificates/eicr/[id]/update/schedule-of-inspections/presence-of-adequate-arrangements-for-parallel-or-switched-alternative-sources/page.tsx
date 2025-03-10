import { notFound } from "next/navigation";

import { UpdatePresenceOfAdequateArrangementsForm } from "./form";

export default async function UpdatePresenceOfAdequateArrangements({ params }: { params: Promise<{ id: string }> }) {
  const electricalInstallationConditionReport = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    select: {
      id: true,
      item_2_1: true,
      item_2_2: true,
    },
  });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return <UpdatePresenceOfAdequateArrangementsForm electricalInstallationConditionReport={electricalInstallationConditionReport} />;
}
