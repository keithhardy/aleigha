import { z } from "zod";

export const UpdateElectricalInstallationConditionReportSchema = z.object({
  id: z.string().cuid(),
  clientId: z.string().cuid(),
  propertyId: z.string().cuid(),
  startDate: z.date(),
  endDate: z.date(),
});
