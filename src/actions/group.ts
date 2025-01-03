'use server';

import prisma from '@/lib/prisma';
import { ServerActionResponse } from '@/lib/types';
import { CreateGroupSchema } from '@/zod/group';
import { Group } from '@prisma/client';
import { z } from 'zod';

export async function createGroupAction(
  data: z.infer<typeof CreateGroupSchema>
): Promise<ServerActionResponse<Group>> {
  try {
    const group = await prisma.group.create({ data });

    return {
      status: 'success',
      heading: 'Group Created Successfully',
      message: 'The new group has been created and saved to the database.',
      payload: group,
    };
  } catch (error) {
    return {
      status: 'error',
      heading: 'Group Creation Failed',
      message: 'There was an issue creating the group. Please try again.',
    };
  }
}
