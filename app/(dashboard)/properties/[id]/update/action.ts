"use server";

import { z } from "zod";

import { UpdatePropertySchema } from "@/app/(dashboard)/properties/[id]/update/schema";
import { prisma } from "@/lib/db/prisma-client";
import { ServerActionResponse } from "@/next.types";

export async function updateProperty(
  property: z.infer<typeof UpdatePropertySchema>,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.property.update({
      where: {
        id: property.id,
      },
      data: {
        uprn: property.uprn,
        occupier: property.occupier,
        client: { connect: { id: property.client } },
        address: {
          update: {
            streetAddress: property.address.streetAddress,
            city: property.address.city,
            county: property.address.county,
            postTown: property.address.postTown,
            postCode: property.address.postCode,
            country: property.address.country,
          },
        },
      },
    });

    return {
      status: "success",
      heading: "Property Updated Successfully",
      message: "The property has been updated.",
    };
  } catch {
    return {
      status: "error",
      heading: "Property Update Failed",
      message: "There was an issue updating the property. Please try again.",
    };
  }
}
