import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma-client";

import { UpdateDeclarationForm } from "./form";

export default async function UpdateDeclaration({ params }: { params: Promise<{ id: string }> }) {
  const certificate = await prisma.electricalInstallationConditionReport.findFirst({
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
      endDate: true,
    },
  });

  const users = await prisma.user.findMany();

  if (!certificate) {
    notFound();
  }

  return <UpdateDeclarationForm certificate={certificate as ElectricalInstallationConditionReport} users={users} />;
}
