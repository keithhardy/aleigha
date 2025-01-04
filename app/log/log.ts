import { z } from 'zod';
import { $Enums } from '@prisma/client';

export const CreateLogSchema = z.object({
  model: z.nativeEnum($Enums.LogModel),
  action: z.nativeEnum($Enums.LogAction),
  status: z.nativeEnum($Enums.LogStatus),
  message: z
    .string()
    .min(1, "Message cannot be left empty.")
    .max(255, "Message must be 255 characters or less."),
  user: z.object({
    connect: z.object({
      id: z
        .string()
        .regex(/^c[0-9a-fA-F]{25,}$/i, "User ID must be a valid cuid() format.")
    })
  })
});
