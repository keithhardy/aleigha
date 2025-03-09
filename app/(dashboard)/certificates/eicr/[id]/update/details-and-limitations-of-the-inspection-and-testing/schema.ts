import { z } from "zod";

export const UpdateDetailsAndLimitationsOfTheInspectionAndTestingSchema = z.object({
  id: z.string().cuid(),
  regulationAccordanceAsAmendedTo: z.string(),
  detailsOfTheElectricalInstallation: z.string(),
  extentOfSampling: z.string(),
  agreedLimitations: z.string(),
  agreedLimitationsWith: z.string(),
  operationalLimitations: z.string(),
});
