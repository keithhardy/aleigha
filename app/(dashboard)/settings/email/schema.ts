import { z } from "zod";

export const UpdateEmailSchema = z.object({
  id: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().cuid().optional(),
  ),
  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().email("Invalid email format"),
  ),
});
