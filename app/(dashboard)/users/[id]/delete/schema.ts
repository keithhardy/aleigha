import { z } from "zod";

export const DeleteUserSchema = z.object({
  id: z.string().cuid(),
});
