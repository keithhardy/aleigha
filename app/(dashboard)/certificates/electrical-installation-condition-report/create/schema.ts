import { z } from "zod";

export const Schema = z.object({
  creatorId: z.string(),
  clientId: z.string(),
  propertyId: z.string(),
});
