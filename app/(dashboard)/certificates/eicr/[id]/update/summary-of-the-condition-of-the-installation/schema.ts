import { z } from "zod";

export const UpdateSummaryOfTheConditionOfTheInstallationSchema = z.object({
  id: z.string().cuid(),
  generalCondition: z.string().optional(),
  estimatedAgeOfElectricalInstallation: z.string().optional(),
  evidenceOfAlterations: z.boolean().optional(),
  estimatedAgeOfAlterations: z.string().optional(),
  overallAssessmentOfTheInstallation: z.boolean().optional(),
});
