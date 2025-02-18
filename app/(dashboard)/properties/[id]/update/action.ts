"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { Schema } from "@/app/(dashboard)/properties/[id]/update/schema";
import { prisma } from "@/lib/prisma";

export async function updateProperty(
  property: z.infer<typeof Schema>
): Promise<void> {
  try {
    await prisma.property.update({
      where: {
        id: property.id,
      },
      data: {
        uprn: property.uprn,
        occupier: property.occupier,
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

    revalidatePath("/properties");
  } catch {
    throw new Error("Property update failed");
  }
}
