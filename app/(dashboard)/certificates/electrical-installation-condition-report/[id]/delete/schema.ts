import { z } from "zod";

export const Schema = z.object({
  id: z.string().optional(),
  serial: z.string().optional(),
});
