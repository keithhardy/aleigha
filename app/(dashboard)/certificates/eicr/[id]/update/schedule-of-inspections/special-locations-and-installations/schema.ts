import { z } from "zod";

export const Schema = z.object({
  item_9_1A: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_9_1B: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_9_1C: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_9_1D: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_9_1E: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_9_1F: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_9_1G: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_9_1H: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_9_2: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
});
