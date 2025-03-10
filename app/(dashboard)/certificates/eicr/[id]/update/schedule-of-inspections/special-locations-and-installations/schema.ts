import { z } from "zod";

export const UpdateSpecialLocationsAndInstallationsSchema = z.object({
  id: z.string().cuid(),
  item_9_1A: z.string().optional(),
  item_9_1B: z.string().optional(),
  item_9_1C: z.string().optional(),
  item_9_1D: z.string().optional(),
  item_9_1E: z.string().optional(),
  item_9_1F: z.string().optional(),
  item_9_1G: z.string().optional(),
  item_9_1H: z.string().optional(),
  item_9_2: z.string().optional(),
});
