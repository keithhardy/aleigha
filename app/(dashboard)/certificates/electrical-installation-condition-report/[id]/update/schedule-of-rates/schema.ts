import { z } from "zod";

export const Schema = z.object({
  scheduleOfRates: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
    }),
  ),
});
