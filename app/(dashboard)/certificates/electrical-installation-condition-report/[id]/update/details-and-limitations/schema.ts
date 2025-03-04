import { z } from "zod";

export const Schema = z.object({
  regulationAccordance: z.string(),
  electricalInstalationCoveredByThisReport: z.string(),
  agreedLimitations: z.string(),
  agreedLimitationsWith: z.string(),
  operationalLimitations: z.string(),
});
