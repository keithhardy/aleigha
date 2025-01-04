'use server';

import { Message } from '@prisma/client';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { ServerActionResponse } from '@/lib/types';
import { getFormattedDateTime } from '@/lib/utils';

import { CreateMessageSchema } from './schema';

export async function createMessageAction(
  data: z.infer<typeof CreateMessageSchema>
): Promise<ServerActionResponse<Message>> {
  try {
    const message = await prisma.message.create({ data, include: { group: true } });
    
    await prisma.log.create({
      data: {
        model: 'MESSAGE',
        action: 'CREATE',
        status: 'SUCCESS',
        message: `Message to ${message.group.name} was sent on ${getFormattedDateTime()}`,
        user: {
          connect: {
            id: 'cm5heg65w0000uqpkaqo0uv5m'
          }
        }
      }
    })

    return {
      status: 'success',
      heading: 'Message Sent Successfully',
      message: 'The new message has been sent.',
      payload: message,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    await prisma.log.create({
      data: {
        model: 'MESSAGE',
        action: 'CREATE',
        status: 'SUCCESS',
        message: `There was an issue sending message on ${getFormattedDateTime()}`,
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
      heading: 'Message Send Failed',
      message: 'There was an issue sending the message. Please try again.',
    };
  }
}
