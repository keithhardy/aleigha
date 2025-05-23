import { PrismaClient } from "@prisma/client";
import { stringify } from "csv-stringify";
import { NextRequest } from "next/server";
import { Readable, PassThrough } from "stream";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const ids: string[] = await req.json();

  if (!Array.isArray(ids) || ids.length === 0) {
    return new Response("No IDs provided", { status: 400 });
  }

  const properties = await prisma.property.findMany({
    where: {
      id: { in: ids },
    },
    select: {
      uprn: true,
      occupier: true,
      createdAt: true,
      updatedAt: true,
      client: {
        select: { name: true },
      },
      address: {
        select: {
          streetAddress: true,
          city: true,
          county: true,
          postTown: true,
          postCode: true,
          country: true,
        },
      },
    },
  });

  if (!properties.length) {
    return new Response("No properties found", { status: 404 });
  }

  const flattenedProperties = properties.map((property) => {
    return {
      uprn: property.uprn || "",
      occupier: property.occupier || "",
      client_name: property.client?.name || "",
      address_street_address: property.address?.streetAddress || "",
      address_city: property.address?.city || "",
      address_county: property.address?.county || "",
      address_post_town: property.address?.postTown || "",
      address_post_code: property.address?.postCode || "",
      address_country: property.address?.country || "United Kingdom",
      created_at: property.createdAt.toString() || "",
      updated_at: property.updatedAt.toString() || "",
    };
  });

  const passThroughStream = new PassThrough();

  const csvStream = stringify({
    header: true,
    columns: Object.keys(flattenedProperties[0]),
  });

  Readable.from(flattenedProperties).pipe(csvStream).pipe(passThroughStream);

  const readableStream = new ReadableStream({
    start(controller) {
      passThroughStream.on("data", (chunk) => controller.enqueue(chunk));
      passThroughStream.on("end", () => controller.close());
      passThroughStream.on("error", (err) => controller.error(err));
    },
  });

  return new Response(readableStream, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="properties.csv"',
    },
  });
}
