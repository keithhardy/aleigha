import { z } from "zod";

export const Schema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  picture: z.string().optional(),
  governingBody: z.string().optional(),
  governingBodyNumber: z.string().optional(),
  address: z.object({
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    county: z.string().optional(),
    postTown: z.string().optional(),
    postCode: z.string().optional(),
    country: z.string().optional(),
  }),
});
