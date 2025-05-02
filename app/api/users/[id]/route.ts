import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

import {
  getUser,
  updateUser,
  deleteUser,
  updateAuth0User,
  deleteAuth0User,
} from "@/lib/services/user-services";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await getUser(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data = await req.json();
    await updateAuth0User(id, {
      name: data.name,
      email: data.email,
    });
    const user = await updateUser(id, {
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
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deleteAuth0User(id);
    await deleteUser(id);
    return NextResponse.json(null, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
