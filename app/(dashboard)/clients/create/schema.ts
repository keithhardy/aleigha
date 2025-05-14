import { z } from "zod";

export const CreateClientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .regex(/^[\d\s+()-]+$/, "Phone number can only contain digits, spaces, +, (), and -"),
  picture: z
    .string()
    .optional()
    .refine((value) => {
      if (value && typeof value === "string") {
        const [metadata, base64String] = value.split(",");
        if (!metadata.startsWith("data:image/")) return false;
        const buffer = Buffer.from(base64String, "base64");
        return buffer.length <= 1 * 1024 * 1024;
      }
      return true;
    }, "File must be an image and less than 1 MB."),
  appointedPerson: z.string().min(2, "Appointed person must be at least 2 characters long"),
  address: z.object({
    streetAddress: z.string().min(3, "Street address must be at least 3 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    county: z.preprocess((val) => (val === "" ? undefined : val), z.string().optional()),
    postTown: z.preprocess((val) => (val === "" ? undefined : val), z.string().optional()),
    postCode: z.string().regex(/^[A-Z0-9\s]{5,10}$/i, "Invalid postcode format"),
    country: z.string().min(2, "Country must be at least 2 characters"),
  }),
});
