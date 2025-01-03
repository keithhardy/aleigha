import { checkEmailExists } from '@/actions/user';
import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z' -]+$/, {
      message: 'Name can only contain letters, spaces, hyphens, or apostrophes',
    })
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be no more than 50 characters' }),
  email: z
    .string()
    .email()
    .refine(async (email) => !(await checkEmailExists(email)), {
      message: 'Email is already in use',
    }),
  phone: z
    .string()
    .regex(/^(?:\+44|0)(?:\d{9}|\d{10}|\d{11}|\d{12})$/, { message: 'Invalid phone number format' })
    .optional(),
  position: z.nativeEnum($Enums.UserPosition),
  signature: z.string().url().optional(),
  picture: z.string().url().optional(),
});
