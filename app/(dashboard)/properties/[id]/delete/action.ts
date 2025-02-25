"use server";

import { z } from "zod";

import { Schema } from "@/app/(dashboard)/properties/[id]/delete/schema";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

export async function deleteProperty(
  property: z.infer<typeof Schema>,
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
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      heading: "Property Delete Failed",
      message: "There was an issue deleting the property. Please try again.",
    };
  }
}
