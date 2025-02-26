import { z } from "zod";

export const CreateElectricalInstallationConditionReportSchema = z.object({
  creatorId: z.string().cuid(),
  clientId: z.string().cuid(),
  propertyId: z.string().cuid(),
});
