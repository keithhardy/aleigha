'use server';

import { User } from '@prisma/client';
import { z } from 'zod';

import { ServerActionResponse } from '@/lib/types';
import { prisma } from '@/lib/prisma';
import { getFormattedDateTime } from '@/lib/utils';

import { CreateUserSchema } from './schema';

export async function createUserAction(
  data: z.infer<typeof CreateUserSchema>
): Promise<ServerActionResponse<User>> {
  try {
    const user = await prisma.user.create({ data });

    await prisma.log.create({
      data: {
        model: 'USER',
        action: 'CREATE',
        status: 'SUCCESS',
        message: `User ${user.name} was created on ${getFormattedDateTime()}`,
        user: {
          connect: {
            id: 'cm5heg65w0000uqpkaqo0uv5m'
          }
        }
      }
    })

    return {
      status: 'success',
      heading: 'User Created Successfully',
      message: 'The new user has been created.',
      payload: user,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    await prisma.log.create({
      data: {
        model: 'USER',
        action: 'CREATE',
        status: 'FAILED',
        message: `There was an issue creating user ${data.name} on ${getFormattedDateTime()}`,
        error: errorMessage,
        user: {
          connect: {
            id: 'cm5heg65w0000uqpkaqo0uv5m'
          }
        }
      }
    })

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
  } catch {
    throw new Error('Failed to check email availability');
  }
}
