"use server";

import { z } from "zod";

import { Schema } from "@/app/(dashboard)/clients/[id]/delete/schema";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";
import { deleteFile } from "@/lib/vercel-blob";

export async function deleteClient(
  client: z.infer<typeof Schema>,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.client.delete({
      where: {
        id: client.id,
      },
    });

    if (client.picture) {
      await deleteFile(client.picture);
    }

    return {
      status: "success",
      heading: "Client Deleted Successfully",
      message: "The client has been deleted.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      heading: "Client Deletion Failed",
      message: "There was an issue deleting the client. Please try again.",
    };
  }
}
