import { z } from "zod";

export const UpdateDetailsAndLimitationsOfTheInspectionAndTestingSchema =
  z.object({
    id: z.string().cuid(),
    regulationAccordanceAsAmendedTo: z.string().optional(),
    detailsOfTheElectricalInstallation: z.string().optional(),
    extentOfSampling: z.string().optional(),
    agreedLimitations: z.string().optional(),
    agreedLimitationsWith: z.string().optional(),
    operationalLimitations: z.string().optional(),
  });
