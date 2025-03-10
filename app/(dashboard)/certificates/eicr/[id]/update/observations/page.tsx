import { notFound } from "next/navigation";

import { UpdateObservationsForm } from "./form";

export default async function UpdateObservations({
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
        observations: true,
      },
    });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return (
    <UpdateObservationsForm
      electricalInstallationConditionReport={
        electricalInstallationConditionReport
      }
    />
  );
}
