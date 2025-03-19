import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { UpdatePurposeOfTheReportForm } from "./form";

export default async function UpdatePurposeOfTheReport({ params }: { params: Promise<{ id: string }> }) {
  const certificate = await prisma.electricalInstallationConditionReport.findFirst({
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

  if (!certificate) {
    notFound();
  }

  return <UpdatePurposeOfTheReportForm certificate={certificate as ElectricalInstallationConditionReport} />;
}
