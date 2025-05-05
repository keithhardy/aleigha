import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { createAuth0User } from "@/auth0";
import { createUser, getUsers } from "@/prisma";

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to get users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const auth0User = await createAuth0User({
      connection: "Username-Password-Authentication",
      name: data.name,
      email: data.email,
      password: data.password,
    });
    const user = await createUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role as UserRole,
      auth0Id: auth0User.user_id,
    });
    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
