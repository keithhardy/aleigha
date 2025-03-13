import { z } from "zod";

export const UpdateDeclarationSchema = z.object({
  id: z.string().cuid(),
  recommendedRetestDate: z.date().optional(),
  reasonForRecommendation: z.string().optional(),
  inspectorId: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().optional(),
  ),
  inspectionDate: z.date().optional(),
  reviewerId: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().optional(),
  ),
  reviewDate: z.date().optional(),
});
