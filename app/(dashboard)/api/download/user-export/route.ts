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

  const users = await prisma.user.findMany({
    where: {
      id: { in: ids },
    },
    select: {
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!users.length) {
    return new Response("No users found", { status: 404 });
  }

  const flattenedUsers = users.map((user) => {
    return {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "",
      created_at: user.createdAt.toString() || "",
      updated_at: user.updatedAt.toString() || "",
    };
  });

  const passThroughStream = new PassThrough();

  const csvStream = stringify({
    header: true,
    columns: Object.keys(flattenedUsers[0]),
  });

  Readable.from(flattenedUsers).pipe(csvStream).pipe(passThroughStream);

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
      "Content-Disposition": 'attachment; filename="users.csv"',
    },
  });
}
