import { UserRole } from "@prisma/client";
import { z } from "zod";

import { checkEmailExists } from "../actions";

export const CreateUserSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z' -]+$/, {
      message: "Name can only contain letters, spaces, hyphens, or apostrophes",
    })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be no more than 50 characters" }),
  email: z
    .string()
    .email()
    .refine(async (email) => !(await checkEmailExists(email)), {
      message: "Email is already in use",
    }),
  phone: z
    .string()
    .regex(/^(?:\+44|0)(?:\d{9}|\d{10}|\d{11}|\d{12})$/, {
      message: "Invalid phone number format",
    })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one digit" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
  signature: z.string().url().optional(),
  role: z.enum(Object.values(UserRole) as [UserRole, ...UserRole[]], {
    message: "Please select a role for the user",
  }),
  clients: z
    .array(
      z.object({
        name: z.string(),
        clientId: z.string(),
      })
    )
    .min(1, "Please select at least one client"),
});
