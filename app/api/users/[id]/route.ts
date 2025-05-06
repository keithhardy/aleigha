import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { userService } from "@/src/factories/user-service-factory";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await userService.getUser(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const user = await userService.updateUser(id, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      signature: data.signature,
      role: data.role as UserRole,
      clients: {
        connect: data.clients.connect,
        disconnect: data.clients.disconnect,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await userService.deleteUser(id);
    return NextResponse.json(null, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
