import { z } from "zod";

export const UpdatePurposeOfTheReportSchema = z.object({
  id: z.string().cuid(),
  purpose: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  recordsAvailable: z.boolean().optional(),
  previousReportAvailable: z.boolean().optional(),
  previousReportDate: z.date().optional(),
});
