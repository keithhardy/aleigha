import { z } from "zod";

export const AuthUserSchema = z.object({
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

export const CreateAuthUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  connection: z.string(),
  password: z.string().optional(),
});

export const UpdateAuthUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
});

export type AuthUserDto = z.infer<typeof AuthUserSchema>;
export type CreateAuthUserDto = z.infer<typeof CreateAuthUserSchema>;
export type UpdateAuthUserDto = z.infer<typeof UpdateAuthUserSchema>;
