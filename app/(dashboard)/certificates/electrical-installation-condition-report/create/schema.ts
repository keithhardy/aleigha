import { z } from "zod";

export const CreateElectricalInstallationConditionReportSchema = z.object({
  creatorId: z.string(),
  clientId: z.string(),
  propertyId: z.string(),
});
