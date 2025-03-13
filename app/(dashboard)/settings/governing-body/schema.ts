import { z } from "zod";

export const UpdateGoverningBodySchema = z.object({
  id: z.preprocess((val) => (val === "" ? undefined : val), z.string().cuid().optional()),
  governingBody: z.preprocess((val) => (val === "" ? undefined : val), z.string().min(2, "Governing body must be at least 2 characters long").optional()),
  governingBodyNumber: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .regex(/^[a-zA-Z0-9]+$/, "Governing body number must be alphanumeric")
      .optional(),
  ),
});
