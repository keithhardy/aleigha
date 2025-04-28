"use server";

import { parse } from "csv-parse/sync";
import { z } from "zod";

import { prisma } from "@/lib/prisma-client";
import { ServerActionResponse } from "@/types/server-action-response";

import { UploadPropertiesSchema } from "./schema";

const CsvPropertySchema = z.object({
  uprn: z.string(),
  occupier: z.string(),
  client: z.string(),
  streetAddress: z.string(),
  city: z.string(),
  county: z.string().optional(),
  postTown: z.string().optional(),
  postCode: z.string(),
  country: z.string(),
});

type CsvProperty = z.infer<typeof CsvPropertySchema>;

export async function uploadProperties(
  data: z.infer<typeof UploadPropertiesSchema>,
): Promise<ServerActionResponse<null>> {
  try {
    const buffer = await data.csv.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    const records = parse(fileBuffer, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as CsvProperty[];

    const validatedRecords = records.map((record) =>
      CsvPropertySchema.parse(record),
    );

    console.log(validatedRecords);

    await prisma.$transaction(
      validatedRecords.map((property) =>
        prisma.property.create({
          data: {
            uprn: property.uprn,
            occupier: property.occupier,
            client: { connect: { id: property.client } },
            address: {
              create: {
                streetAddress: property.streetAddress,
                city: property.city,
                county: property.county,
                postTown: property.postTown,
                postCode: property.postCode,
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
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      heading: "Property Upload Failed",
      message:
        "There was an issue uploading the properties. Please check your CSV and try again.",
    };
  }
}
