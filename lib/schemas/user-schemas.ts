import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.string(),
  clients: z.array(
    z.object({
      name: z.string(),
      clientId: z.string(),
    }),
  ),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  id: z.string(),
  auth0Id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.string(),
  signature: z.string(),
  clients: z.object({
    connect: z.array(
      z.object({
        id: z.string(),
      }),
    ),
    disconnect: z.array(
      z.object({
        id: z.string(),
      }),
    ),
  }),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
