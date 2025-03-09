import { notFound } from "next/navigation";

import { UpdatePurposeOfTheReportForm } from "./form";

export default async function UpdatePurposeOfTheReport({ params }: { params: Promise<{ id: string }> }) {
  const electricalInstallationConditionReport = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    select: {
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

  return <UpdatePurposeOfTheReportForm electricalInstallationConditionReport={electricalInstallationConditionReport} />;
}
