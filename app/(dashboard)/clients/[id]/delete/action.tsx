"use server";

import { z } from "zod";

import { DeleteClientSchema } from "@/app/(dashboard)/clients/[id]/delete/schema";
import { prisma } from "@/lib/prisma-client";
import { ServerActionResponse } from "@/types/server-action-response";
import { deleteFile } from "@/lib/vercel-blob";

export async function deleteClient(
  client: z.infer<typeof DeleteClientSchema>,
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
  } catch {
    return {
      status: "error",
      heading: "Client Deletion Failed",
      message: "There was an issue deleting the client. Please try again.",
    };
  }
}
