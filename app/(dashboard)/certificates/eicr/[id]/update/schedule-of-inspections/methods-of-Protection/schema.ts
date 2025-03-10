import { z } from "zod";

export const UpdateMethodsOfProtectionSchema = z.object({
  id: z.string().cuid(),
  item_3_1A: z.string().optional(),
  item_3_1B: z.string().optional(),
  item_3_1C: z.string().optional(),
  item_3_1D: z.string().optional(),
  item_3_1E: z.string().optional(),
  item_3_1F: z.string().optional(),
  item_3_1G: z.string().optional(),
  item_3_1H: z.string().optional(),
  item_3_1I: z.string().optional(),
  item_3_2: z.string().optional(),
  item_3_3A: z.string().optional(),
  item_3_3B: z.string().optional(),
  item_3_3C: z.string().optional(),
  item_3_3D: z.string().optional(),
  item_3_3E: z.string().optional(),
  item_3_3F: z.string().optional(),
});
