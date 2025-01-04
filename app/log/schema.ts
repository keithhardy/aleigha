'use server';

import { Log } from '@prisma/client';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { ServerActionResponse } from '@/lib/types';

import { CreateLogSchema } from './log';

export async function createLogAction(
  data: z.infer<typeof CreateLogSchema>
): Promise<ServerActionResponse<Log>> {
  try {
    const log = await prisma.log.create({ data });

    return {
      status: 'success',
      heading: 'Log Recorded Successfully',
      message: 'The new log has been recorded.',
      payload: log,
    };
  } catch {
    return {
      status: 'error',
      heading: 'Log Record Failed',
      message: 'There was an issue recording the log. Please try again.',
    };
  }
}
