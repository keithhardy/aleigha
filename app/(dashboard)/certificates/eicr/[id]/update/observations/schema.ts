import { z } from "zod";

export const UpdateObservationsSchema = z.object({
  id: z.string().cuid(),
  observations: z
    .array(
      z.object({
        itemNumber: z.string(),
        description: z.string(),
        code: z.string(),
        location: z.string(),
      }),
    )
    .default([]),
});
