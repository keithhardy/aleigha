import { z } from "zod";

export const UpdateAddressSchema = z.object({
  id: z.preprocess((val) => (val === "" ? undefined : val), z.string().cuid().optional()),
  address: z.object({
    streetAddress: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().min(3, "Street address must be at least 3 characters").optional(),
    ),
    city: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().min(2, "City must be at least 2 characters").optional(),
    ),
    county: z.preprocess((val) => (val === "" ? undefined : val), z.string().optional()),
    postTown: z.preprocess((val) => (val === "" ? undefined : val), z.string().optional()),
    postCode: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z
        .string()
        .regex(/^[A-Z0-9\s]{5,10}$/i, "Invalid postcode format")
        .optional(),
    ),
    country: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().min(2, "Country must be at least 2 characters").optional(),
    ),
  }),
});
