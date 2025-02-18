import { z } from "zod";

export const Schema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string().optional(),
  picture: z.string().optional(),
  appointedPerson: z.string().optional(),
  address: z.object({
    id: z.string().optional(),
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    county: z.string().optional(),
    postTown: z.string().optional(),
    postCode: z.string().optional(),
    country: z.string().optional(),
  }),
});
