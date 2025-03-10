import { z } from "zod";

export const UpdateIsolationAndSwitchingSchema = z.object({
  id: z.string().cuid(),
  item_7_1A: z.string().optional(),
  item_7_1B: z.string().optional(),
  item_7_1C: z.string().optional(),
  item_7_1D: z.string().optional(),
  item_7_1E: z.string().optional(),
  item_7_1F: z.string().optional(),
  item_7_2A: z.string().optional(),
  item_7_2B: z.string().optional(),
  item_7_2C: z.string().optional(),
  item_7_2D: z.string().optional(),
  item_7_3A: z.string().optional(),
  item_7_3B: z.string().optional(),
  item_7_3C: z.string().optional(),
  item_7_3D: z.string().optional(),
  item_7_4A: z.string().optional(),
  item_7_4B: z.string().optional(),
});
