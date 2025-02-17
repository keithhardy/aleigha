import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  picture: z.string(),
  governingBody: z.string(),
  governingBodyNumber: z.string(),
  streetAddress: z.string(),
  city: z.string(),
  county: z.string(),
  postTown: z.string(),
  postCode: z.string(),
  country: z.string(),
});
