"use server";

import { z } from "zod";

import { Schema } from "@/app/(dashboard)/properties/[id]/update/schema";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

export async function updateProperty(
  property: z.infer<typeof Schema>,
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
            streetAddress: property.address?.streetAddress,
            city: property.address?.city,
            county: property.address?.county,
            postTown: property.address?.postTown,
            postCode: property.address?.postCode,
            country: property.address?.country,
          },
        },
      },
    });

    return {
      status: "success",
      heading: "Property Updated Successfully",
      message: "The new property has been updated.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      heading: "Property Update Failed",
      message: "There was an issue updating the property. Please try again.",
    };
  }
}
