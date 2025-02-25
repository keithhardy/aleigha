import { z } from "zod";

export const DeleteClientSchema = z.object({
  id: z.string().cuid(),
  picture: z.string().url().nullable(),
});
