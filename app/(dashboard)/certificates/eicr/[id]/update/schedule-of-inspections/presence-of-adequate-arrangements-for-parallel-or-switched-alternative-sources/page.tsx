import { notFound } from "next/navigation";

import { UpdatePresenceOfAdequateArrangementsForm } from "./form";

export default async function UpdatePresenceOfAdequateArrangements({ params }: { params: Promise<{ id: string }> }) {
  const electricalInstallationConditionReport = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    select: {
      id: true,
      purpose: true,
      startDate: true,
      endDate: true,
      recordsAvailable: true,
      previousReportAvailable: true,
      previousReportDate: true,
    },
  });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return <UpdatePresenceOfAdequateArrangementsForm electricalInstallationConditionReport={electricalInstallationConditionReport} />;
}
