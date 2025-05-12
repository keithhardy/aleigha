"use server";

import { z } from "zod";

import { DeletePropertySchema } from "@/app/(dashboard)/properties/[id]/delete/schema";
import { prisma } from "@/lib/db/prisma-client";
import { ServerActionResponse } from "@/next.types";

export async function deleteProperty(
  property: z.infer<typeof DeletePropertySchema>,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.property.delete({
      where: {
        id: property.id,
      },
    });

    return {
      status: "success",
      heading: "Property Deleted Successfully",
      message: "The property has been deleted.",
    };
  } catch {
    return {
      status: "error",
      heading: "Property Delete Failed",
      message: "There was an issue deleting the property. Please try again.",
    };
  }
}
