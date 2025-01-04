'use server';

import { User } from '@prisma/client';

import { auth0Management } from '@/lib/auth0-management';
import { prisma } from '@/lib/prisma';
import { ServerActionResponse } from '@/lib/types';
import { getFormattedDateTime } from '@/lib/utils';

import { getCurrentUser } from '../actions';

export async function deleteUserAction(data: User): Promise<ServerActionResponse<User>> {
  const currentUser = await getCurrentUser()

  if (!['ADMINISTRATOR', 'MANAGER'].includes(currentUser.position)) {
    return {
      status: 'error',
      heading: 'User Deletion Failed',
      message: 'Only administrators or managers can delete users.',
    };
  }
  
  try {
    await auth0Management.users.delete({
      id: currentUser.auth0Id,
    });
    
    await prisma.user.delete({ 
      where: {
        id: data.id,
      },
    });

    await prisma.log.create({
      data: {
        model: 'USER',
        action: 'DELETE',
        status: 'SUCCESS',
        message: `User ${data.name} was deleted on ${getFormattedDateTime()}`,
        user: {
          connect: {
            email: currentUser.email
          }
        }
      }
    })

    return {
      status: 'success',
      heading: 'User Deleted Successfully',
      message: 'The user has been deleted.',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    await prisma.log.create({
      data: {
        model: 'USER',
        action: 'DELETE',
        status: 'FAILED',
        message: `There was an issue deleting user ${data.name} on ${getFormattedDateTime()}`,
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
      heading: 'User Deletion Failed',
      message: 'There was an issue deleting the user. Please try again.',
    };
  }
}