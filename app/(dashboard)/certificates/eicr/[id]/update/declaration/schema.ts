import { z } from "zod";

export const UpdateDeclarationSchema = z.object({
  recommendedRetestDate: z.date(),
  reasonForRecommendation: z.string(),
  inspectorId: z.string().optional(),
  inspectionDate: z.date().optional(),
  reviewerId: z.string().optional(),
  reviewDate: z.date().optional(),
});
