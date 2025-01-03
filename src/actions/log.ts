'use server';

import prisma from '@/lib/prisma';
import { ServerActionResponse } from '@/lib/types';
import { CreateLogSchema } from '@/zod/log';
import { Log } from '@prisma/client';
import { z } from 'zod';

export async function createLogAction(
  data: z.infer<typeof CreateLogSchema>
): Promise<ServerActionResponse<Log>> {
  try {
    const log = await prisma.log.create({ data });

    return {
      status: 'success',
      heading: 'Log Created Successfully',
      message: 'The new log has been created and saved to the database.',
      payload: log,
    };
  } catch (error) {
    return {
      status: 'error',
      heading: 'Log Creation Failed',
      message: 'There was an issue creating the log. Please try again.',
    };
  }
}
