import { z } from "zod";

export const Schema = z.object({
  name: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  picture: z
    .string()
    .optional()
    .refine((value) => {
      if (value && typeof value === "string") {
        const base64String = value.split(",")[1];
        const buffer = Buffer.from(base64String, "base64");
        const fileSize = buffer.length;
        return fileSize <= 1 * 1024 * 1024;
      }
      return true;
    }, "File size must be less than 1 MB."),
  appointedPerson: z.string().optional(),
  address: z.object({
    streetAddress: z.string(),
    city: z.string(),
    county: z.string().optional(),
    postTown: z.string(),
    postCode: z.string(),
    country: z.string().optional(),
  }),
});
