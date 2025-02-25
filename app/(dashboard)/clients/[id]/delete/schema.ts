import { z } from "zod";

export const DeleteClientSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  picture: z.string().url().optional(),
});
