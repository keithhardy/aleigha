import { z } from "zod";

export const Schema = z.object({
  id: z.string(),
  clientId: z.string(),
  propertyId: z.string(),
});
