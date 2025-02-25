import { z } from "zod";

export const DeleteElectricalInstallationConditionReportSchema = z.object({
  id: z.string().optional(),
  serial: z.string().optional(),
});
