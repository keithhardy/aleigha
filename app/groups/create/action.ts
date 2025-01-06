'use server';

import { Group } from '@prisma/client';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { ServerActionResponse } from '@/lib/types';
import { getFormattedDateTime } from '@/lib/utils';

import { CreateGroupSchema } from './schema';

export async function createGroupAction(
  data: z.infer<typeof CreateGroupSchema>
): Promise<ServerActionResponse<Group>> {
  try {
    const group = await prisma.group.create({ data });
    
    await prisma.log.create({
      data: {
        model: 'GROUP',
        action: 'CREATE',
        status: 'SUCCESS',
        message: `Group ${group.name} was created on ${getFormattedDateTime()}`,
        user: {
          connect: {
            id: 'cm5heg65w0000uqpkaqo0uv5m'
          }
        }
      }
    })

    return {
      status: 'success',
      heading: 'Group Created Successfully',
      message: 'The new group has been created.',
      payload: group,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    await prisma.log.create({
      data: {
        model: 'GROUP',
        action: 'CREATE',
        status: 'FAILED',
        message: `There was an issue creating group ${data.name} on ${getFormattedDateTime()}`,
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
      heading: 'Group Creation Failed',
      message: 'There was an issue creating the group. Please try again.',
    };
  }
}
