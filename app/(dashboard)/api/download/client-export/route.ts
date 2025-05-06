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

  const clients = await prisma.client.findMany({
    where: {
      id: { in: ids },
    },
    select: {
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
      appointedPerson: true,
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

  if (!clients.length) {
    return new Response("No clients found", { status: 404 });
  }

  const flattenedClients = clients.map((client) => {
    return {
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      appointed_person: client.appointedPerson || "",
      address_street_address: client.address?.streetAddress || "",
      address_city: client.address?.city || "",
      address_county: client.address?.county || "",
      address_post_town: client.address?.postTown || "",
      address_post_code: client.address?.postCode || "",
      address_country: client.address?.country || "United Kingdom",
      created_at: client.createdAt.toString() || "",
      updated_at: client.updatedAt.toString() || "",
    };
  });

  const passThroughStream = new PassThrough();

  const csvStream = stringify({
    header: true,
    columns: Object.keys(flattenedClients[0]),
  });

  Readable.from(flattenedClients).pipe(csvStream).pipe(passThroughStream);

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
      "Content-Disposition": 'attachment; filename="clients.csv"',
    },
  });
}
