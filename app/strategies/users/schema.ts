import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  auth0Id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.enum(["Admin", "Manager", "Planner", "Operative", "Client"]),
  signature: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type User = z.infer<typeof userSchema>;

export const createUserSchema = z.object({
  auth0Id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.enum(["Admin", "Manager", "Planner", "Operative", "Client"]),
  signature: z.string().nullable(),
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
export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  id: z.string(),
  auth0Id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.enum(["Admin", "Manager", "Planner", "Operative", "Client"]),
  signature: z.string().nullable(),
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
