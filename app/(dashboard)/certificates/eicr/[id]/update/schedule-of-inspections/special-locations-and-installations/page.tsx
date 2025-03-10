import { notFound } from "next/navigation";

import { UpdateSpecialLocationsAndInstallationsForm } from "./form";

export default async function UpdateSpecialLocationsAndInstallations({
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
        item_9_1A: true,
        item_9_1B: true,
        item_9_1C: true,
        item_9_1D: true,
        item_9_1E: true,
        item_9_1F: true,
        item_9_1G: true,
        item_9_1H: true,
        item_9_2: true,
      },
    });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return (
    <UpdateSpecialLocationsAndInstallationsForm
      electricalInstallationConditionReport={
        electricalInstallationConditionReport
      }
    />
  );
}
