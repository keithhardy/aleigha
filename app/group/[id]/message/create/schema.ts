import { z } from "zod";

export const CreateMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message content cannot be empty.")
    .max(500, "Message content is too long. Max 500 characters allowed.")
    .regex(/^[a-zA-Z0-9\s.,!?'"()-]*$/, "Message contains invalid characters."),
  sender: z.object({
    connect: z.object({
      id: z.string()
    })
  }),
  group: z.object({
    connect: z.object({
      id: z.string()
    })
  })
});
