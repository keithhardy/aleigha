import { z } from "zod";

export const Schema = z.object({
  inspectorsName: z.string(),
  inspectorsSignatureDate: z.string(),
  retestDate: z.string(),
  reasonForRecommendation: z.string(),
  qualifiedSupervisorsName: z.string(),
  qualifiedSupervisorsSignatureDate: z.string(),
});
