import { z } from "zod";

export const createUserSchema = z.object({
});

export type CreateUserInput = z.infer<typeof createUserSchema>;


export const updateUserSchema = z.object({
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
