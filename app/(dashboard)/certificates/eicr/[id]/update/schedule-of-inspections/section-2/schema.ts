import { z } from "zod";

export const Schema = z.object({
  item_2_1: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
  item_2_2: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
});
