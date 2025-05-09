import { z } from "zod";

export const UpdateFinalCircuitsSchema = z.object({
  id: z.string().cuid(),
  item_6_1: z.string().optional(),
  item_6_2: z.string().optional(),
  item_6_3: z.string().optional(),
  item_6_4: z.string().optional(),
  item_6_5: z.string().optional(),
  item_6_6: z.string().optional(),
  item_6_7: z.string().optional(),
  item_6_8: z.string().optional(),
  item_6_9: z.string().optional(),
  item_6_10: z.string().optional(),
  item_6_11: z.string().optional(),
  item_6_12A: z.string().optional(),
  item_6_12B: z.string().optional(),
  item_6_13A: z.string().optional(),
  item_6_13B: z.string().optional(),
  item_6_13C: z.string().optional(),
  item_6_13D: z.string().optional(),
  item_6_13E: z.string().optional(),
  item_6_14: z.string().optional(),
  item_6_15: z.string().optional(),
  item_6_16: z.string().optional(),
  item_6_17A: z.string().optional(),
  item_6_17B: z.string().optional(),
  item_6_17C: z.string().optional(),
  item_6_17D: z.string().optional(),
  item_6_18: z.string().optional(),
  item_6_19: z.string().optional(),
  item_6_20: z.string().optional(),
});
