import { z } from "zod";

export const Schema = z.object({
  item_1_1A: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_1_1B: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_1_1C: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_1_1D: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_1_1E: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_1_1F: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_1_2: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_1_3: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
});
