import { z } from "zod";

export const UpdatePhoneSchema = z.object({
  id: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().cuid().optional()
  ),
  phone: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .regex(
        /^[\d\s+()-]+$/,
        "Phone number can only contain digits, spaces, +, (), and -"
      )
  ),
});
