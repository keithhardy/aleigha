import { z } from "zod";

export const UserRoleEnum = z.enum(["Admin", "Manager", "Planner", "Operative", "Client"]);

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: UserRoleEnum,
  signature: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: UserRoleEnum,
  signature: z.string().nullable().optional(),
  clients: z.object({
    connect: z.array(
      z.object({
        id: z.string(),
      }),
    ),
  }),
});

export const UpdateUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: UserRoleEnum,
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

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UserFacets = Record<string, { value: string; count: number }[]>;
export type UserTotal = number;
