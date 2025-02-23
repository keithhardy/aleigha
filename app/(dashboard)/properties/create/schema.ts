import { z } from "zod";

export const Schema = z.object({
  uprn: z.string(),
  occupier: z.string(),
  client: z.string(),
  address: z.object({
    streetAddress: z.string(),
    city: z.string(),
    county: z.string().optional(),
    postTown: z.string(),
    postCode: z.string(),
    country: z.string().optional(),
  }),
});
