import { z } from "zod";

export const UpdateIntakeEquipmentSchema = z.object({
  item_1_1A: z.string(),
  item_1_1B: z.string(),
  item_1_1C: z.string(),
  item_1_1D: z.string(),
  item_1_1E: z.string(),
  item_1_1F: z.string(),
  item_1_2: z.string(),
  item_1_3: z.string(),
});
