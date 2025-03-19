import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { UpdateDeclarationForm } from "./form";

export default async function UpdateDeclaration({ params }: { params: Promise<{ id: string }> }) {
  const electricalInstallationConditionReport = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    select: {
      id: true,
      recommendedRetestDate: true,
      reasonForRecommendation: true,
      inspectorId: true,
      inspectionDate: true,
      reviewerId: true,
      reviewDate: true,
    },
  });

  const users = await prisma.user.findMany();

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return <UpdateDeclarationForm electricalInstallationConditionReport={electricalInstallationConditionReport as ElectricalInstallationConditionReport} users={users} />;
}
