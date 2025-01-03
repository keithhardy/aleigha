'use server';

import prisma from '@/lib/prisma';
import { ServerActionResponse } from '@/lib/types';
import { CreateMessageSchema } from '@/zod/message';
import { Message } from '@prisma/client';
import { z } from 'zod';

export async function createMessageAction(
  data: z.infer<typeof CreateMessageSchema>
): Promise<ServerActionResponse<Message>> {
  try {
    const message = await prisma.message.create({ data });

    return {
      status: 'success',
      heading: 'Message Created Successfully',
      message: 'The new message has been created and saved to the database.',
      payload: message,
    };
  } catch (error) {
    console.log(error)
    return {
      status: 'error',
      heading: 'Message Creation Failed',
      message: 'There was an issue creating the message. Please try again.',
    };
  }
}
