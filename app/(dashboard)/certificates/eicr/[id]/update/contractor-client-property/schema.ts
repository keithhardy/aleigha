import { z } from "zod";

export const UpdateContractorClientPropertySchema = z.object({
  id: z.string().cuid(),
  clientId: z.string().cuid(),
  propertyId: z.string().cuid(),
});
