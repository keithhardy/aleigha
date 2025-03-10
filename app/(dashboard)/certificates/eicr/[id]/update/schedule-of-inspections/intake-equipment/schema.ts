import { z } from "zod";

export const UpdateIntakeEquipmentSchema = z.object({
  id: z.string().cuid(),
  item_1_1A: z.string().optional(),
  item_1_1B: z.string().optional(),
  item_1_1C: z.string().optional(),
  item_1_1D: z.string().optional(),
  item_1_1E: z.string().optional(),
  item_1_1F: z.string().optional(),
  item_1_2: z.string().optional(),
  item_1_3: z.string().optional(),
});
