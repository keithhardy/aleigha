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

  const flattenedCertificates = certificates.map((certificate) => {
    return {
      address_street_address: certificate.property.address?.streetAddress || "",
      address_city: certificate.property.address?.city || "",
      address_county: certificate.property.address?.county || "",
      address_post_town: certificate.property.address?.postTown || "",
      address_post_code: certificate.property.address?.postCode || "",
      address_country:
        certificate.property.address?.country || "United Kingdom",
      created_at: certificate.createdAt.toString() || "",
      updated_at: certificate.updatedAt.toString() || "",
    };
  });

  const passThroughStream = new PassThrough();

  const csvStream = stringify({
    header: true,
    columns: Object.keys(flattenedCertificates[0]),
  });

  Readable.from(flattenedCertificates).pipe(csvStream).pipe(passThroughStream);

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
