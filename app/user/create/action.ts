'use server';

import { User } from '@prisma/client';
import { omit } from 'lodash';
import { z } from 'zod';

import { auth0Management } from '@/lib/auth0-management';
import { prisma } from '@/lib/prisma';
import { ServerActionResponse } from '@/lib/types';
import { getFormattedDateTime } from '@/lib/utils';

import { CreateUserSchema } from './schema';
import { getCurrentUser } from '../actions';

export async function createUserAction( data: z.infer<typeof CreateUserSchema> ): Promise<ServerActionResponse<User>> {
  const currentUser = await getCurrentUser()

  if (!['ADMINISTRATOR', 'MANAGER'].includes(currentUser.position)) {
    return {
      status: 'error',
      heading: 'User Creation Failed',
      message: 'You must be an administrator or manager to create users.',
    };
  }
  
  try {
    await auth0Management.users.create({
      connection: 'Username-Password-Authentication',
      name: data.name,
      email: data.email,
      password: data.password
    });
    
    await prisma.user.create({
      data: omit(data, 'password')
    });

    await prisma.log.create({
      data: {
        model: 'USER',
        action: 'CREATE',
        status: 'SUCCESS',
        message: `User ${data.name} was created on ${getFormattedDateTime()}`,
        user: {
          connect: {
            email: currentUser.email
          }
        }
      }
    })

    return {
      status: 'success',
      heading: 'User Created Successfully',
      message: 'The new user has been created.'
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
            email: currentUser.email
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
