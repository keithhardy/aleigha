'use server';

import { User } from '@prisma/client';
import { omit } from 'lodash';
import { redirect } from 'next/navigation'
import { z } from 'zod';

import { getCurrentUser, isCurrentUser } from '@/lib/auth';
import { auth0Management } from '@/lib/auth0-management';
import { prisma } from '@/lib/prisma';
import { ServerActionResponse } from '@/lib/types';
import { getFormattedDateTime } from '@/lib/utils';

import { CreateUserSchema } from './schema';

export async function createUserAction(
  data: z.infer<typeof CreateUserSchema>
): Promise<ServerActionResponse<User>> {
  const user = await getCurrentUser()
  
  if (!user) redirect('/auth/login')
  
  const hasAccess = await isCurrentUser(['ADMINISTRATOR', 'MANAGER']);

  if (!hasAccess) {
    return {
      status: 'error',
      heading: 'User Creation Failed',
      message: 'You must be an administrator or manager to create users.',
    };
  }
  
  try {
    const auth0User = await auth0Management.users.create({
      connection: 'Username-Password-Authentication',
      name: data.name,
      email: data.email,
      password: data.password
    });

    const prismaUser = await prisma.user.create({
      data: {...omit(data, 'password'), auth0Id: auth0User.data.user_id}
    });

    await prisma.log.create({
      data: {
        model: 'USER',
        action: 'CREATE',
        status: 'SUCCESS',
        message: `User ${prismaUser.name} was created on ${getFormattedDateTime()}`,
        user: {
          connect: {
            id: user.id
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
            id: user.id
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
