"use server";

import { parse } from "csv-parse/sync";
import { z } from "zod";

import { prisma } from "@/lib/prisma-client";
import { ServerActionResponse } from "@/types/server-action-response";

import { ImportPropertiesSchema } from "./schema";

const PropertySchema = z.object({
  uprn: z.string(),
  occupier: z.string(),
  street_address: z.string(),
  city: z.string(),
  county: z.string().optional(),
  post_town: z.string().optional(),
  post_code: z.string(),
  country: z.string(),
});

type Property = z.infer<typeof PropertySchema>;

export async function importProperties(
  data: z.infer<typeof ImportPropertiesSchema>,
): Promise<ServerActionResponse<null>> {
  try {
    const buffer = await data.file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    const records = parse(fileBuffer, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as Property[];

    const validatedRecords = records.map((record) =>
      PropertySchema.parse(record),
    );

    await prisma.$transaction(
      validatedRecords.map((property) =>
        prisma.property.create({
          data: {
            uprn: property.uprn,
            occupier: property.occupier,
            client: { connect: { id: data.client } },
            address: {
              create: {
                streetAddress: property.street_address,
                city: property.city,
                county: property.county,
                postTown: property.post_town,
                postCode: property.post_code,
                country: property.country,
              },
            },
          },
        }),
      ),
    );

    return {
      status: "success",
      heading: "Properties Uploaded Successfully",
      message: `${validatedRecords.length} properties have been created.`,
    };
  } catch {
    return {
      status: "error",
      heading: "Property Upload Failed",
      message:
        "There was an issue uploading the properties. Please check your File and try again.",
    };
  }
}
