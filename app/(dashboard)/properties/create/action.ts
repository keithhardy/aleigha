"use server";

import { Property } from "@prisma/client";
import { z } from "zod";

import { CreatePropertySchema } from "@/app/(dashboard)/properties/create/schema";
import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/prisma";

export async function createProperty(
  property: z.infer<typeof CreatePropertySchema>,
): Promise<ServerActionResponse<Property>> {
  try {
    await prisma.property.create({
      data: {
        uprn: property.uprn,
        occupier: property.occupier,
        client: { connect: { id: property.client } },
        address: {
          create: {
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
      heading: "Property Created Successfully",
      message: "The new property has been created.",
    };
  } catch {
    return {
      status: "error",
      heading: "Property Creation Failed",
      message: "There was an issue creating the property. Please try again.",
    };
  }
}
