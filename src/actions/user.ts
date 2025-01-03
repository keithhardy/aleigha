'use server';

import prisma from '@/lib/prisma';
import { ServerActionResponse } from '@/lib/types';
import { CreateUserSchema } from '@/zod/user';
import { User } from '@prisma/client';
import { z } from 'zod';

export async function createUserAction(
  data: z.infer<typeof CreateUserSchema>
): Promise<ServerActionResponse<User>> {
  try {
    const user = await prisma.user.create({ data });

    return {
      status: 'success',
      heading: 'User Created Successfully',
      message: 'The new user has been created and saved to the database.',
      payload: user,
    };
  } catch (error) {
    return {
      status: 'error',
      heading: 'User Creation Failed',
      message: 'There was an issue creating the user. Please try again.',
    };
  }
}

export async function checkEmailExists(
  email: string
): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    return user !== null;
  } catch (error) {
    throw new Error('Failed to check email availability');
  }
}
