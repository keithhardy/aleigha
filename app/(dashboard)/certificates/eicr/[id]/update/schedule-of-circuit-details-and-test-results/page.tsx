import { notFound } from "next/navigation";

import { UpdateScheduleOfCircuitDetailsAndTestResultsForm } from "./form";

export default async function UpdateScheduleOfCircuitDetailsAndTestResults({
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
        db: true,
      },
    });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return (
    <UpdateScheduleOfCircuitDetailsAndTestResultsForm
      electricalInstallationConditionReport={
        electricalInstallationConditionReport
      }
    />
  );
}
