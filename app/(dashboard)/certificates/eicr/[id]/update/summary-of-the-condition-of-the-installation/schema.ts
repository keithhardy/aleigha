import { z } from "zod";

export const UpdateSummaryOfTheConditionOfTheInstallationSchema = z.object({
  id: z.string().cuid(),
  generalCondition: z.string(),
  estimatedAgeOfElectricalInstallation: z.string(),
  evidenceOfAlterations: z.boolean(),
  estimatedAgeOfAlterations: z.string(),
  overallAssessmentOfTheInstallation: z.boolean(),
});
