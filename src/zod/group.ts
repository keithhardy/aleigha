import { z } from "zod";

export const CreateGroupSchema = z.object({
  name: z
    .string()
    .min(3, "Group name must be at least 3 characters long.")
    .max(100, "Group name is too long. Max 100 characters allowed.")
    .regex(/^[a-zA-Z0-9\s]+$/, "Group name can only contain letters, numbers, and spaces."),
  users: z.object({
    connect: z.array(
      z.object({
        id: z.string()
      })
    )
  })
});
