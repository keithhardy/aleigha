import { z } from "zod";

export const UpdateScheduleOfRatesSchema = z.object({
  id: z.string().cuid(),
  rates: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    )
    .default([]),
});
