import { z } from "zod";

export const Schema = z.object({
  id: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().cuid().optional()
  ),

  name: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().optional()
  ),

  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().email("Invalid email format").optional()
  ),

  phone: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .regex(
        /^[\d\s+()-]+$/,
        "Phone number can only contain digits, spaces, +, (), and -"
      )
      .optional()
  ),

  picture: z
    .preprocess((val) => (val === "" ? undefined : val), z.string().optional())
    .refine((value) => {
      if (value && typeof value === "string") {
        const [metadata, base64String] = value.split(",");
        if (!metadata.startsWith("data:image/")) return false;
        const buffer = Buffer.from(base64String, "base64");
        return buffer.length <= 1 * 1024 * 1024;
      }
      return true;
    }, "File must be an image and less than 1 MB."),

  governingBody: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .min(2, "Governing body must be at least 2 characters long")
      .optional()
  ),

  governingBodyNumber: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .regex(/^[a-zA-Z0-9]+$/, "Governing body number must be alphanumeric")
      .optional()
  ),

  address: z.object({
    streetAddress: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z
        .string()
        .min(3, "Street address must be at least 3 characters")
        .optional()
    ),

    city: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().min(2, "City must be at least 2 characters").optional()
    ),

    county: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().optional()
    ),

    postTown: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().optional()
    ),

    postCode: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z
        .string()
        .regex(/^[A-Z0-9\s]{5,10}$/i, "Invalid postcode format")
        .optional()
    ),

    country: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().min(2, "Country must be at least 2 characters").optional()
    ),
  }),
});
