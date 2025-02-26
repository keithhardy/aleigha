import { z } from "zod";

export const DeletePropertySchema = z.object({
  id: z.string().cuid(),
});
