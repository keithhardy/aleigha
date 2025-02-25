import { z } from "zod";

export const DeleteUserSchema = z.object({
  id: z.string(),
  auth0Id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  signature: z.string().nullable(),
});
