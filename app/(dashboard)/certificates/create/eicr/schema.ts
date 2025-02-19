import { z } from "zod";

export const Schema = z.object({
  userId: z.string(),
  clientId: z.string(),
  propertyId: z.string(),
});
