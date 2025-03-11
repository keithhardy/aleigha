import { z } from "zod";

export const UpdateScheduleOfCircuitDetailsAndTestResultsSchema = z.object({
  id: z.string().cuid(),
  db: z
    .array(
      z.object({
        dbDesignation: z.string(),
        circuits: z.array(
          z.object({
            circuitNumber: z.string(),
          }),
        ),
      }),
    )
    .default([]),
});
