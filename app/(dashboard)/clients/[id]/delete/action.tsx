"use server";

import { z } from "zod";

import { DeleteClientSchema } from "@/app/(dashboard)/clients/[id]/delete/schema";
import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/prisma";

export async function deleteClient(
  client: z.infer<typeof DeleteClientSchema>,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.client.delete({
      where: {
        id: client.id,
      },
    });

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
