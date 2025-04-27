import { z } from "zod";

export const CreateCertificateSchema = z.object({
  type: z.string(),
  creatorId: z.string().cuid(),
  clientId: z.string().cuid(),
  propertyId: z.string().cuid(),
});
