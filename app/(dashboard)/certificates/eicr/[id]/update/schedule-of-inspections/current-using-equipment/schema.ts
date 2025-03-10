import { z } from "zod";

export const UpdateCurrentUsingEquipmentSchema = z.object({
  id: z.string().cuid(),
  item_8_1: z.string().optional(),
  item_8_2: z.string().optional(),
  item_8_3: z.string().optional(),
  item_8_4: z.string().optional(),
  item_8_5: z.string().optional(),
  item_8_6: z.string().optional(),
  item_8_7A: z.string().optional(),
  item_8_7B: z.string().optional(),
  item_8_7C: z.string().optional(),
  item_8_7D: z.string().optional(),
});
