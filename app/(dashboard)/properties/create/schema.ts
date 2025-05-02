import { z } from "zod";

export const CreatePropertySchema = z.object({
  uprn: z.string().min(2, "UPRN must be at least 2 characters long"),
  occupier: z.string().min(2, "Occupier must be at least 2 characters long"),
  client: z.string().cuid(),
  address: z.object({
    streetAddress: z
      .string()
      .min(3, "Street address must be at least 3 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    county: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().optional(),
    ),
    postTown: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().optional(),
    ),
    postCode: z
      .string()
      .regex(/^[A-Z0-9\s]{5,10}$/i, "Invalid postcode format"),
    country: z.string().min(2, "Country must be at least 2 characters"),
  }),
});
