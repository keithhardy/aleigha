import { z } from "zod";

export const UpdateScheduleOfRatesSchema = z.object({
  rates: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
    }),
  ),
});
