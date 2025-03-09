import { z } from "zod";

export const UpdatePurposeOfTheReportSchema = z.object({
  purpose: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  recordsAvailable: z.boolean(),
  previousReportAvailable: z.boolean(),
  previousReportDate: z.date(),
});
