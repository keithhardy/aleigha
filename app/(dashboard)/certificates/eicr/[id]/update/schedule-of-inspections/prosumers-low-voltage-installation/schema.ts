import { z } from "zod";

export const Schema = z.object({
  item_10_0: z.enum(["c1", "c2", "c3", "na", "lim", "r"] as const),
});
