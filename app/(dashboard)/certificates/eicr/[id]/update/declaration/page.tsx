import { notFound } from "next/navigation";

import { UpdateDeclarationForm } from "./form";

export default async function UpdateDeclaration({
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
        recommendedRetestDate: true,
        reasonForRecommendation: true,
        inspectorId: true,
        inspector: {
          include: true,
        },
        inspectionDate: true,
        reviewerId: true,
        reviewer: {
          include: true,
        },
        reviewDate: true,
      },
    });

  const users = await prisma.user.findMany();

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return (
    <UpdateDeclarationForm
      electricalInstallationConditionReport={
        electricalInstallationConditionReport
      }
      users={users}
    />
  );
}
