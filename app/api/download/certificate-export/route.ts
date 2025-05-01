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

  const certificates =
    await prisma.electricalInstallationConditionReport.findMany({
      where: {
        id: { in: ids },
      },
      select: {
        createdAt: true,
        updatedAt: true,
        client: {
          select: { name: true },
        },
        property: {
          select: {
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
        },
      },
    });

  if (!certificates.length) {
    return new Response("No certificates found", { status: 404 });
  }

  const flattenedProperties = certificates.map(
    (electricalInstallationConditionReport) => {
      return {
        address_street_address:
          electricalInstallationConditionReport.property.address
            ?.streetAddress || "",
        address_city:
          electricalInstallationConditionReport.property.address?.city || "",
        address_county:
          electricalInstallationConditionReport.property.address?.county || "",
        address_post_town:
          electricalInstallationConditionReport.property.address?.postTown ||
          "",
        address_post_code:
          electricalInstallationConditionReport.property.address?.postCode ||
          "",
        address_country:
          electricalInstallationConditionReport.property.address?.country ||
          "United Kingdom",
        created_at:
          electricalInstallationConditionReport.createdAt.toString() || "",
        updated_at:
          electricalInstallationConditionReport.updatedAt.toString() || "",
      };
    },
  );

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
      "Content-Disposition": 'attachment; filename="certificates.csv"',
    },
  });
}
