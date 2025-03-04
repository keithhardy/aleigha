import { z } from "zod";

export const Schema = z.object({
  generalCondition: z.string(),
  estimatedAgeOfElectricalInstallation: z.string(),
  evidenceOfAlterations: z.boolean(),
  estimatedAgeOfAlterations: z.string(),
  overallAssessmentOfTheInstallation: z.boolean(),
});
