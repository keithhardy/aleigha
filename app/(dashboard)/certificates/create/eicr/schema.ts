import { z } from "zod";

export const schema = z.object({
  userId: z.string(),
  clientId: z.string(),
  propertyId: z.string(),
});

export type Schema = z.infer<typeof schema>;
