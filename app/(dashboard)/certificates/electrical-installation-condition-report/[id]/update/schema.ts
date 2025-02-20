import { z } from "zod";

export const Schema = z.object({
  id: z.string(),
  clientId: z.string(),
  propertyId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});
