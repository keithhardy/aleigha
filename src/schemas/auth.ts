import { z } from "zod";

export const UserSchema = z.object({
  user_id: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  username: z.string(),
  phone_number: z.string(),
  phone_verified: z.boolean(),
  created_at: z.union([z.string(), z.record(z.any())]),
  updated_at: z.union([z.string(), z.record(z.any())]),
  identities: z.array(z.record(z.any())),
  app_metadata: z.record(z.any()),
  user_metadata: z.record(z.any()),
  picture: z.string(),
  name: z.string(),
  nickname: z.string(),
  multifactor: z.array(z.string()),
  last_ip: z.string(),
  last_login: z.union([z.string(), z.record(z.any())]),
  logins_count: z.number(),
  blocked: z.boolean(),
  given_name: z.string(),
  family_name: z.string(),
});

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  connection: z.string(),
  password: z.string().optional(),
});

export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
});

export const CurrentUserSchema = z.object({
  sub: z.string(),
  name: z.string().optional(),
  nickname: z.string().optional(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
  picture: z.string().optional(),
  email: z.string().email().optional(),
  email_verified: z.boolean().optional(),
  org_id: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type CurrentUser = z.infer<typeof CurrentUserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
