import { z } from "zod";

export const UpdateSummaryOfTheConditionOfTheInstallationSchema = z.object({
  generalCondition: z.string(),
  estimatedAgeOfElectricalInstallation: z.string(),
  evidenceOfAlterations: z.boolean(),
  estimatedAgeOfAlterations: z.string(),
  overallAssessmentOfTheInstallation: z.boolean(),
});
