import { z } from "zod";

export const Schema = z.object({
  purpose: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  recordsAvailable: z.boolean(),
  previousReportAvailable: z.boolean(),
  previousReportDate: z.string(),
});
