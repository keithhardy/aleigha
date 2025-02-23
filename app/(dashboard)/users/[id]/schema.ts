import { UserRole } from "@prisma/client";
import { z } from "zod";

import { checkEmailExists } from "../actions";

export const Schema = z.object({
  id: z.string(),
  auth0Id: z.string(),
  name: z
    .string()
    .regex(/^[a-zA-Z' -]+$/, {
      message: "Name can only contain letters, spaces, hyphens, or apostrophes",
    })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be no more than 50 characters" }),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+44|0)(?:\d{9}|\d{10}|\d{11}|\d{12})$/, {
    message: "Invalid phone number format",
  }),
  signature: z.string().url(),
  role: z.enum(Object.values(UserRole) as [UserRole, ...UserRole[]]),
  clientsToConnect: z.array(
    z.object({
      name: z.string(),
      clientId: z.string(),
    })
  ),
  clientsToDisconnect: z.array(
    z.object({
      name: z.string(),
      clientId: z.string(),
    })
  ),
});
