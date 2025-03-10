import { z } from "zod";

export const UpdateProsumersLowVoltageInstallationSchema = z.object({
  id: z.string().cuid(),
  item_10_0: z.string().optional(),
});
