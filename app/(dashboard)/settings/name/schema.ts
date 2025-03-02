import { z } from "zod";

export const UpdateNameSchema = z.object({
  id: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().cuid().optional()
  ),
  name: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .regex(/^[a-zA-Z' -]+$/, {
        message:
          "Name can only contain letters, spaces, hyphens, or apostrophes",
      })
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name must be no more than 50 characters" })
  ),
});
