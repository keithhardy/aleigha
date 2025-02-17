import { z } from "zod";

export const Schema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
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
